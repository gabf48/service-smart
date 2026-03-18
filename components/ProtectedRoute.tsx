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

    if (!user) {
      router.replace("/login");
      return;
    }

    if (role && userRole !== role) {
      router.replace("/");
    }
  }, [user, userRole, loading, router, role]);

  if (loading) return null;
  if (!user) return null;
  if (role && userRole !== role) return null;

  return <>{children}</>;
}