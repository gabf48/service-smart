"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRequireAal2 } from "@/app/mfa/_hooks/useRequireAal2";
import { useAuth } from "@/app/context/useAuth";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { checking } = useRequireAal2();
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    if (!loading && user && role !== "admin") {
      router.replace("/dashboard/user");
    }
  }, [loading, user, role, router]);

  if (loading || checking || !user || role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Se verifică accesul...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />

      <main className="relative flex-1 overflow-hidden p-6">
        <div className="absolute inset-0">
          <img
            src="/space.gif"
            alt="Space background"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black" />
        </div>

        <div className="relative">{children}</div>
      </main>
    </div>
  );
}