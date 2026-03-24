"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import {
  getUserRole,
  getSessionUser,
  onAuthChange,
  signOut,
} from "./authService";

type RoleType = "admin" | "user" | null;

type AuthContextType = {
  user: any;
  role: RoleType;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  logout: async () => {},
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<RoleType>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = async (sessionUser: any) => {
    if (sessionUser) {
      const r = await getUserRole(sessionUser.id);
      setUser(sessionUser);
      setRole(r);
    } else {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
  };

  const refreshAuth = async () => {
    setLoading(true);
    const sessionUser = await getSessionUser();
    await hydrate(sessionUser);
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const sessionUser = await getSessionUser();
      if (!mounted) return;
      await hydrate(sessionUser);
    };

    init();

    const unsubscribe = onAuthChange(async (sessionUser) => {
      if (!mounted) return;
      await hydrate(sessionUser);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
    setRole(null);
    setLoading(false);
    window.location.href = "/home";
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, logout, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);