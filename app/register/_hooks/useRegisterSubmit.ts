"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";
import { validateRegisterForm } from "../_utils/validateRegisterForm";
import { completeRegisterSuccess } from "../_utils/completeRegisterSuccess";

export function useRegisterSubmit() {
  const router = useRouter();

  const handleRegister = async ({
    emailTrim,
    emailRegex,
    password,
    password2,
    acceptTerms,
    setLoading,
    setErrorMsg,
    setSuccessMsg,
    setEmail,
    setPassword,
    setPassword2,
    setAcceptTerms,
  }: {
    emailTrim: string;
    emailRegex: RegExp;
    password: string;
    password2: string;
    acceptTerms: boolean;
    setLoading: (v: boolean) => void;
    setErrorMsg: (v: string | null) => void;
    setSuccessMsg: (v: string | null) => void;
    setEmail: (v: string) => void;
    setPassword: (v: string) => void;
    setPassword2: (v: string) => void;
    setAcceptTerms: (v: boolean) => void;
  }) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const validationError = validateRegisterForm({
      emailTrim,
      emailRegex,
      password,
      password2,
      acceptTerms,
    });

    if (validationError) {
      setErrorMsg(validationError);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: emailTrim,
      password,
    });

    if (error) {
      setErrorMsg(mapSupabaseAuthErrorToRo(error.message));
      setLoading(false);
      return;
    }

    completeRegisterSuccess({
      emailTrim,
      setSuccessMsg,
      setEmail,
      setPassword,
      setPassword2,
      setAcceptTerms,
    });

    setLoading(false);
  };

  return {
    goToLogin: () => router.push("/login"),
    handleRegister,
  };
}