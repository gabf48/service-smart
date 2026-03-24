"use client";

import { useEffect } from "react";
import { useRegisterState } from "./useRegisterState";
import { useRegisterSubmit } from "./useRegisterSubmit";

export function useRegisterForm() {
  const state = useRegisterState();
  const { handleRegister: submit, goToLogin } = useRegisterSubmit();

  const scrollAndFocus = (el?: HTMLElement | null) => {
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    if (typeof (el as any).focus === "function") (el as any).focus();
  };

  const focusFirstInvalid = () => {
    if (!state.emailTrim || !state.emailRegex.test(state.emailTrim)) {
      return scrollAndFocus(state.emailRef.current);
    }
    if (!state.password) return scrollAndFocus(state.passWrapRef.current);
    if (!state.password2 || state.password !== state.password2) {
      return scrollAndFocus(state.pass2WrapRef.current);
    }
    if (!state.acceptTerms) return scrollAndFocus(state.termsRef.current);
  };

  useEffect(() => {
    if (state.errorMsg) focusFirstInvalid();
  }, [state.errorMsg]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.loading) return;

    await submit({
      emailTrim: state.emailTrim,
      emailRegex: state.emailRegex,
      password: state.password,
      password2: state.password2,
      acceptTerms: state.acceptTerms,
      setLoading: state.setLoading,
      setErrorMsg: state.setErrorMsg,
      setSuccessMsg: state.setSuccessMsg,
      setEmail: state.setEmail,
      setPassword: state.setPassword,
      setPassword2: state.setPassword2,
      setAcceptTerms: state.setAcceptTerms,
    });
  };

  return {
    ...state,
    handleRegister,
    goToLogin,
  };
}