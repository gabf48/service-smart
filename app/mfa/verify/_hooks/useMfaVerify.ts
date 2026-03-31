"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function useMfaVerify() {
  const router = useRouter();

  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFactor = async () => {
      const { data } = await supabase.auth.mfa.listFactors();
      const totp = data?.totp ?? [];

      if (!totp.length) {
        router.replace("/dashboard/user");
        return;
      }

      setFactorId(totp[0].id);
    };

    void loadFactor();
  }, [router]);

  const handleVerify = async () => {
    if (!factorId || !code.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: code.trim(),
      });
      if (verify.error) throw verify.error;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .single();

      const role = profile?.role ?? "user";
      router.replace(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch {
      setError("Cod invalid sau expirat.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    void handleVerify();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return {
    code,
    setCode,
    error,
    loading,
    handleSubmit,
    handleLogout,
  };
}