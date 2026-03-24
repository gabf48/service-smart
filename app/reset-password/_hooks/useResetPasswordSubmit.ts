"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { mapResetPasswordErrorToRo } from "../_utils/resetPasswordErrors";

export function useResetPasswordSubmit() {
  const router = useRouter();

  const handleReset = async ({
    e,
    password,
    confirmPassword,
    saving,
    canReset,
    setErrorMsg,
    setSuccessMsg,
    setSaving,
  }: {
    e: React.FormEvent;
    password: string;
    confirmPassword: string;
    saving: boolean;
    canReset: boolean;
    setErrorMsg: (value: string | null) => void;
    setSuccessMsg: (value: string | null) => void;
    setSaving: (value: boolean) => void;
  }) => {
    e.preventDefault();
    if (saving || !canReset) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    if (password.length < 6) {
      setErrorMsg("Parola trebuie să aibă minim 6 caractere.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Parolele nu coincid.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg(mapResetPasswordErrorToRo(error.message));
      setSaving(false);
      return;
    }

    setSuccessMsg("Parola a fost schimbată cu succes.");
    setSaving(false);

    setTimeout(async () => {
      await supabase.auth.signOut();
      router.replace("/login");
    }, 1500);
  };

  return { handleReset };
}