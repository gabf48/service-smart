"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type RoleType = "admin" | "user" | null;

type AuthContextType = {
  user: any;
  role: RoleType;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  logout: async () => {},
  refreshAuth: async () => {},
});

async function getUserRole(userId: string): Promise<"admin" | "user"> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data?.role) {
    return "user";
  }

  return data.role === "admin" ? "admin" : "user";
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<RoleType>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    const sessionUser = data.session?.user ?? null;

    if (sessionUser) {
      const profileRole = await getUserRole(sessionUser.id);
      setUser(sessionUser);
      setRole(profileRole);
    } else {
      setUser(null);
      setRole(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const hydrateAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      if (!mounted) return;

      if (sessionUser) {
        const profileRole = await getUserRole(sessionUser.id);

        if (!mounted) return;

        setUser(sessionUser);
        setRole(profileRole);
      } else {
        setUser(null);
        setRole(null);
      }

      if (mounted) setLoading(false);
    };

    hydrateAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;

      if (sessionUser) {
        const profileRole = await getUserRole(sessionUser.id);

        if (!mounted) return;

        setUser(sessionUser);
        setRole(profileRole);
      } else {
        if (!mounted) return;

        setUser(null);
        setRole(null);
      }

      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    setLoading(false);
    window.location.href = "/home";
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);