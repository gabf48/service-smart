"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLoginState } from "./useLoginState";
import { useLoginSubmit } from "./useLoginSubmit";

export function useLoginForm() {
  const state = useLoginState();
  const { handleLogin: submit } = useLoginSubmit();

  const [forgotMsg, setForgotMsg] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.loading) return;

    setForgotMsg(null);
    setForgotError(null);

    if (!state.validate()) return;

    await submit({
      email: state.email,
      password: state.password,
      setLoading: state.setLoading,
      setErrorMsg: state.setErrorMsg,
    });
  };

  const handleForgotPassword = async () => {
    const emailTrim = state.email.trim();

    setForgotMsg(null);
    setForgotError(null);
    state.setErrorMsg(null);

    if (!emailTrim) {
      setForgotError("Introdu mai întâi adresa de email.");
      return;
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(emailTrim, {
      redirectTo,
    });

    if (error) {
      setForgotError("Nu s-a putut trimite emailul de resetare.");
      return;
    }

    setForgotMsg(
      "Ți-am trimis un email pentru resetarea parolei. Verifică inbox-ul și spam-ul."
    );
  };

  return {
    email: state.email,
    setEmail: state.setEmail,
    password: state.password,
    setPassword: state.setPassword,
    loading: state.loading,
    errorMsg: state.errorMsg,
    forgotMsg,
    forgotError,
    handleLogin,
    handleForgotPassword,
  };
}