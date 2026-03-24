"use client";

import { useMemo, useRef, useState } from "react";
import {
  getPasswordBarClass,
  getPasswordRequirements,
  getPasswordStrength,
} from "../_utils/registerPassword";

export function useRegisterState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passWrapRef = useRef<HTMLDivElement | null>(null);
  const pass2WrapRef = useRef<HTMLDivElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);

  const emailTrim = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailInvalid = emailTrim.length > 0 && !emailRegex.test(emailTrim);

  const req = useMemo(() => getPasswordRequirements(password), [password]);
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const barClass = getPasswordBarClass(strength.score);

  return {
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    acceptTerms,
    setAcceptTerms,
    loading,
    setLoading,
    errorMsg,
    setErrorMsg,
    successMsg,
    setSuccessMsg,
    emailRef,
    passWrapRef,
    pass2WrapRef,
    termsRef,
    emailTrim,
    emailRegex,
    emailInvalid,
    req,
    strength,
    barClass,
  };
}