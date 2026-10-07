import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { hasSupabaseConfig, supabase } from "../lib/supabase";

export interface AppUser {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarColor: string;
  bio: string;
  createdAt?: string;
  lastLoginAt?: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  isAuthReady: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (data: {
    username: string;
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  api: (path: string, options?: RequestInit) => Promise<any>;
}

const TOKEN_KEY = "vision_x_token";
const USER_KEY = "vision_x_user";

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthReady: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
  api: async () => ({}),
});

export const useAuth = () => useContext(AuthContext);

async function parse(res: Response) {
  const text = await res.text();
  let body: any = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { error: text };
  }
  if (!res.ok) {
    throw new Error(body.error || "Something went wrong. Please try again.");
  }
  return body;
}

const AVATAR_COLORS = ["#b45309", "#0f766e", "#7c2d12", "#1e40af", "#4d7c0f"];

function randomAvatarColor(seed: string) {
  const index =
    Math.abs(
      seed
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0),
    ) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function normalizeUserRecord(record: any): AppUser {
  const recordName =
    record?.name ||
    record?.full_name ||
    record?.user_metadata?.name ||
    record?.email?.split("@")[0] ||
    "Traveler";

  const recordUsername = String(
    record?.username ??
      record?.user_metadata?.username ??
      (record?.email ? record.email.split("@")[0] : "traveler"),
  ).toLowerCase();

  return {
    id: record?.id || record?._id || "",
    username: recordUsername,
    name: String(recordName).trim() || "Traveler",
    email: record?.email || "",
    phone: record?.phone || record?.user_metadata?.phone || "",
    role: record?.role || record?.user_metadata?.role || "user",
    avatarColor:
      record?.avatarColor ||
      record?.avatar_color ||
      record?.user_metadata?.avatar_color ||
      randomAvatarColor(recordUsername),
    bio: record?.bio || record?.user_metadata?.bio || "",
    createdAt: record?.createdAt || record?.created_at,
    lastLoginAt: record?.lastLoginAt || record?.last_sign_in_at || null,
  };
}

async function fetchProfileByUserId(userId: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.warn("Supabase profile fetch failed:", error.message);
  }

  return data || null;
}

async function fetchProfileByUsername(username: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("email, username")
    .eq("username", username.toLowerCase())
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.warn("Supabase username lookup failed:", error.message);
  }

  return data || null;
}

async function ensureProfileRow(user: any) {
  if (!supabase || !user) return;

  try {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username || user.email?.split("@")[0] || "traveler",
      full_name: user.user_metadata?.name || user.email?.split("@")[0] || "Traveler",
      phone: user.user_metadata?.phone || "",
      bio: user.user_metadata?.bio || "",
      avatar_color:
        user.user_metadata?.avatar_color ||
        randomAvatarColor(user.user_metadata?.username || user.email || "traveler"),
      role: user.user_metadata?.role || "user",
      created_at: new Date().toISOString(),
    };

    await supabase.from("profiles").upsert(payload, { onConflict: "id" });
  } catch {
    // Ignore profile row setup issues while Supabase is not yet provisioned.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken) setToken(storedToken);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      }

      if (hasSupabaseConfig && supabase) {
        try {
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();
          if (error) throw error;

          if (session?.access_token && session.user) {
            const profile = await fetchProfileByUserId(session.user.id);
            const nextUser = normalizeUserRecord({
              ...session.user,
              ...profile,
              ...session.user.user_metadata,
            });
            setToken(session.access_token);
            setUser(nextUser);
            localStorage.setItem(TOKEN_KEY, session.access_token);
            localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
          }
        } catch {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      }

      setIsAuthReady(true);
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) return;

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        clear();
        return;
      }

      if (session?.user) {
        const syncUser = async () => {
          const profile = await fetchProfileByUserId(session.user.id);
          const nextUser = normalizeUserRecord({
            ...session.user,
            ...profile,
            ...session.user.user_metadata,
          });
          localStorage.setItem(TOKEN_KEY, session.access_token);
          localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
          setToken(session.access_token);
          setUser(nextUser);
        };

        void syncUser();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const persist = useCallback((nextToken: string, nextUser: AppUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken || null);
    setUser(nextUser);
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const api = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string>) || {}),
      };
      const currentToken = localStorage.getItem(TOKEN_KEY);
      if (currentToken) {
        headers.Authorization = `Bearer ${currentToken}`;
      }

      const res = await fetch(path, { ...options, headers });
      if (res.status === 401) {
        clear();
        throw new Error("Your session has expired. Please sign in again.");
      }
      return parse(res);
    },
    [clear],
  );

  const login = useCallback(
    async (identifier: string, password: string) => {
      if (hasSupabaseConfig && supabase) {
        const normalizedIdentifier = identifier.trim();

        let email = normalizedIdentifier;
        if (!email.includes("@")) {
          const profile = await fetchProfileByUsername(normalizedIdentifier);
          if (!profile?.email) {
            throw new Error("No account was found for that username.");
          }
          email = profile.email;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.toLowerCase(),
          password,
        });

        if (error) throw new Error(error.message);

        await ensureProfileRow(data.user);

        const profile = await fetchProfileByUserId(data.user.id);
        const nextUser = normalizeUserRecord({
          ...data.user,
          ...profile,
          ...data.user.user_metadata,
        });

        persist(data.session?.access_token || "", nextUser);
        return;
      }

      const data = await parse(
        await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }),
      );
      persist(data.token, data.user);
    },
    [persist],
  );

  const signup = useCallback(
    async (payload: {
      username: string;
      name: string;
      email: string;
      phone: string;
      password: string;
    }) => {
      if (hasSupabaseConfig && supabase) {
        const username = payload.username.trim();
        const email = payload.email.trim().toLowerCase();
        const name = payload.name.trim();
        const phone = payload.phone.trim();
        const avatarColor = randomAvatarColor(username || email);

        const { data, error } = await supabase.auth.signUp({
          email,
          password: payload.password,
          options: {
            data: {
              username: username.toLowerCase(),
              name,
              phone,
              avatar_color: avatarColor,
              bio: "",
              role: "user",
            },
          },
        });

        if (error) throw new Error(error.message);

        if (data.user) {
          await ensureProfileRow(data.user);
        }

        const nextUser = normalizeUserRecord({
          ...data.user,
          ...data.user?.user_metadata,
          email,
          username: username.toLowerCase(),
          name,
          phone,
          role: "user",
          bio: "",
          avatarColor,
        });

        if (data.session?.access_token) {
          persist(data.session.access_token, nextUser);
          return;
        }

        localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
        return;
      }

      const data = await parse(
        await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      );
      persist(data.token, data.user);
    },
    [persist],
  );

  const logout = useCallback(async () => {
    try {
      if (hasSupabaseConfig && supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } else {
        const currentToken = localStorage.getItem(TOKEN_KEY);
        if (currentToken) {
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentToken}`,
            },
          });
        }
      }
    } catch {
      // best effort audit log
    }
    clear();
  }, [clear]);

  const refreshUser = useCallback(async () => {
    if (hasSupabaseConfig && supabase) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;

      if (!user) {
        clear();
        return;
      }

      const profile = await fetchProfileByUserId(user.id);
      const nextUser = normalizeUserRecord({
        ...user,
        ...profile,
        ...user.user_metadata,
      });
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return;
    }

    if (!localStorage.getItem(TOKEN_KEY)) return;

    try {
      const data = await api("/api/auth/me");
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
    } catch {
      // ignore, session handled by api()
    }
  }, [api, clear]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthReady,
        login,
        signup,
        logout,
        refreshUser,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
