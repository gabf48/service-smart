"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "admin" | "user";
}) {
  const { user, role: userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // ❌ nu e logat → login
    if (!user) {
      router.replace("/login");
      return;
    }

    // ❌ rol greșit → home
    if (role && userRole !== role) {
      router.replace("/");
    }
  }, [user, userRole, loading, router, role]);

  if (loading) return null;

  return <>{children}</>;
}
