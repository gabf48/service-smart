"use client";

import { useState } from "react";
import { useResetPasswordRecovery } from "./useResetPasswordRecovery";
import { useResetPasswordSubmit } from "./useResetPasswordSubmit";

export function useResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [canReset, setCanReset] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useResetPasswordRecovery({
    setErrorMsg,
    setCanReset,
    setLoading,
  });

  const { handleReset: submit } = useResetPasswordSubmit();

  const handleReset = (e: React.FormEvent) =>
    submit({
      e,
      password,
      confirmPassword,
      saving,
      canReset,
      setErrorMsg,
      setSuccessMsg,
      setSaving,
    });

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    saving,
    canReset,
    errorMsg,
    successMsg,
    handleReset,
  };
}