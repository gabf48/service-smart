"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRequireAal2 } from "@/app/mfa/_hooks/useRequireAal2";
import { useAuth } from "@/app/context/useAuth";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { checking } = useRequireAal2();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || checking || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Se verifică accesul...
      </div>
    );
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 min-h-screen bg-gray-100 p-6">{children}</main>
    </div>
  );
}