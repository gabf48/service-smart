"use client";

import { useState } from "react";

export function useLoginState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validate = () => {
    const emailTrim = email.trim();

    if (!emailTrim) {
      setErrorMsg("Te rog introdu adresa de email.");
      return false;
    }

    if (!password) {
      setErrorMsg("Te rog introdu parola.");
      return false;
    }

    return true;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    errorMsg,
    setErrorMsg,
    validate,
  };
}