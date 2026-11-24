"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";

export function useLoginSubmit() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

    console.log("=== LOGIN ATTEMPT ===", { email: email.trim(), redirect: searchParams?.get("redirect") });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.log("LOGIN ERROR:", error.message);
      setErrorMsg(mapSupabaseAuthErrorToRo(error.message));
      setLoading(false);
      return;
    }

    const user = data.user;
    console.log("LOGIN SUCCESS, user:", user?.id, user?.email);
    if (!user) {
      setErrorMsg("Sesiunea nu este disponibilă.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("PROFILE LOOKUP:", { profile, profileError });

    const role = profile?.role === "admin" ? "admin" : "user";
    console.log("DETERMINED ROLE:", role);

    setLoading(false);

    // Honor redirect parameter if present (e.g., from /service access)
    const redirectTo = searchParams?.get("redirect");
    console.log("REDIRECT CHECK:", { redirectTo, searchParams: searchParams?.toString() });

    if (redirectTo) {
      console.log("REDIRECTING TO:", redirectTo);
      router.push(redirectTo);
      return;
    }

    // Default redirect based on role
    const defaultRedirect = role === "admin" ? "/dashboard/admin" : "/dashboard/user";
    console.log("DEFAULT REDIRECT TO:", defaultRedirect);
    router.push(defaultRedirect);
  };

  return { handleLogin };
}