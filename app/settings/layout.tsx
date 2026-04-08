"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRequireAal2 } from "@/app/mfa/_hooks/useRequireAal2";
import { useAuth } from "@/app/context/useAuth";

export default function SettingsLayout({
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

  return <>{children}</>;
}