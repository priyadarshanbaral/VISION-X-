import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

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
  if (!res.ok)
    throw new Error(body.error || "Something went wrong. Please try again.");
  return body;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
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
    setIsAuthReady(true);
  }, []);

  const persist = useCallback((nextToken: string, nextUser: AppUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
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
      if (currentToken) headers.Authorization = `Bearer ${currentToken}`;

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
    } catch {
      // best effort audit log
    }
    clear();
  }, [clear]);

  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    try {
      const data = await api("/api/auth/me");
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
    } catch {
      // ignore, session handled by api()
    }
  }, [api]);

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
