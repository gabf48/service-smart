"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function useRequireAal2() {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const [{ data: factorsData }, { data: aalData }] = await Promise.all([
          supabase.auth.mfa.listFactors(),
          supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        ]);

        if (!mounted) return;

        const hasTotp = (factorsData?.totp ?? []).length > 0;
        const currentAal = aalData?.currentLevel ?? "aal1";

        if (
  hasTotp &&
  currentAal !== "aal2" &&
  pathname !== "/mfa/verify" &&
  pathname !== "/settings/security"
) {
          router.replace("/mfa/verify");
          return;
        }
      } finally {
        if (mounted) setChecking(false);
      }
    };

    void run();

    return () => {
      mounted = false;
    };
  }, [router, pathname]);

  return { checking };
}