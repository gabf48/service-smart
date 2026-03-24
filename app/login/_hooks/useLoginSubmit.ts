"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { TERMS_VERSION } from "@/app/terms";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";

type PendingTerms = {
  terms_version: string;
  email_snapshot?: string;
};

export function useLoginSubmit() {
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
    setLoading,
    setErrorMsg,
  }: {
    email: string;
    password: string;
    setLoading: (v: boolean) => void;
    setErrorMsg: (v: string | null) => void;
  }) => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMsg(mapSupabaseAuthErrorToRo(error.message));
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setErrorMsg("Sesiunea nu este disponibilă.");
      setLoading(false);
      return;
    }

    let pending: PendingTerms | null = null;
    try {
      const raw = localStorage.getItem("pending_terms_acceptance");
      pending = raw ? JSON.parse(raw) : null;
    } catch {}

    const { data: existing } = await supabase
      .from("terms_acceptances")
      .select("id")
      .eq("user_id", user.id)
      .eq("terms_version", TERMS_VERSION)
      .maybeSingle();

    if (!existing) {
      await supabase.from("terms_acceptances").insert({
        user_id: user.id,
        terms_version: TERMS_VERSION,
        email_snapshot: pending?.email_snapshot ?? user.email ?? null,
        user_agent: navigator.userAgent,
      });

      localStorage.removeItem("pending_terms_acceptance");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role ?? "user";
    router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  };

  return { handleLogin };
}