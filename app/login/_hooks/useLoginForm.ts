"use client";

import { useLoginState } from "./useLoginState";
import { useLoginSubmit } from "./useLoginSubmit";

export function useLoginForm() {
  const state = useLoginState();
  const { handleLogin: submit } = useLoginSubmit();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.loading) return;

    if (!state.validate()) return;

    await submit({
      email: state.email,
      password: state.password,
      setLoading: state.setLoading,
      setErrorMsg: state.setErrorMsg,
    });
  };

  return {
    email: state.email,
    setEmail: state.setEmail,
    password: state.password,
    setPassword: state.setPassword,
    loading: state.loading,
    errorMsg: state.errorMsg,
    handleLogin,
  };
}