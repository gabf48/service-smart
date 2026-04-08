"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";

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

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role === "admin" ? "admin" : "user";

    setLoading(false);
    router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  };

  return { handleLogin };
}