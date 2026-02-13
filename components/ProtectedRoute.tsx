"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  children: ReactNode;
  role: "user" | "admin";
};

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, role: userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || userRole !== role) {
      router.replace("/"); // redirecționare pe home page
    }
  }, [user, userRole, router, role]);

  if (!user || userRole !== role) {
    return null;
  }

  return <>{children}</>;
}
