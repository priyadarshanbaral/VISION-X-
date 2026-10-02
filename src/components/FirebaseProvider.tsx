import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from 'firebase/auth';
import { doc, getDocFromServer, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: User | AppUser | null;
  isAuthReady: boolean;
  login: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const GUEST_STORAGE_KEY = 'vision_x_guest_traveler';

const DEFAULT_GUEST_USER: AppUser = {
  uid: 'guest-explorer-odisha',
  displayName: 'Odisha Heritage Traveler',
  email: 'traveler@visionx.odisha',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isAnonymous: true,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthReady: false,
  login: async () => {},
  loginAsGuest: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | AppUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Check if guest user was stored locally
    try {
      const storedGuest = localStorage.getItem(GUEST_STORAGE_KEY);
      if (storedGuest) {
        setUser(JSON.parse(storedGuest));
      }
    } catch {
      // Ignore local storage errors
    }

    // Test Firestore connection
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.warn('Firebase Firestore client is offline or initializing.');
        }
      }
    }
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          localStorage.removeItem(GUEST_STORAGE_KEY);
        } catch {}

        // Ensure user document exists
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDocFromServer(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: currentUser.uid,
              name: currentUser.displayName || 'Vision X Explorer',
              email: currentUser.email || 'traveler@visionx.odisha',
              role: 'user',
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.warn('Note on user profile sync:', error);
        }
      } else {
        // If not logged in via Firebase, check if local guest session is active
        try {
          const storedGuest = localStorage.getItem(GUEST_STORAGE_KEY);
          if (storedGuest) {
            setUser(JSON.parse(storedGuest));
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }

      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        return;
      }

      // Safe fallback to anonymous sign in or local guest explorer
      try {
        await signInAnonymously(auth);
      } catch (anonErr: any) {
        // If anonymous auth is disabled on Firebase project (admin-restricted-operation),
        // fallback to smooth guest explorer profile without throwing an error
        const guestUser = { ...DEFAULT_GUEST_USER };
        setUser(guestUser);
        try {
          localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
        } catch {}
      }
    }
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      // Gracefully set local guest session if Firebase Anonymous Auth is restricted
      const guestUser = { ...DEFAULT_GUEST_USER };
      setUser(guestUser);
      try {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
      } catch {}
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {}

    try {
      localStorage.removeItem(GUEST_STORAGE_KEY);
    } catch {}

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthReady, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default FirebaseProvider;
