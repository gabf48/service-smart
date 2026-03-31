"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";
import {
  getUserRole,
  saveTermsAcceptance,
  userHas2FA,
} from "../_utils/loginPostActions";
import { redirectAfterLogin } from "../_utils/loginRedirect";

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

    try {
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

      await saveTermsAcceptance(user);
      const role = await getUserRole(user.id);
      const has2FA = await userHas2FA();

      setLoading(false);
      redirectAfterLogin({ router, role, has2FA });
    } catch {
      setErrorMsg("Nu s-a putut finaliza logarea.");
      setLoading(false);
    }
  };

  return { handleLogin };
}