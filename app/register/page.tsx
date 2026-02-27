"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TERMS_VERSION } from "@/app/terms";
import PasswordInput from "@/components/PasswordInput";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  const handleRegister = async () => {
    const emailTrim = email.trim();

    if (!acceptTerms) {
      setTermsError("Trebuie să accepți Termenii și condițiile ca să îți creezi cont.");
      return;
    }

    setTermsError(null);

    // salvăm local ca să inserăm după primul login (după confirmare)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "pending_terms_acceptance",
        JSON.stringify({
          terms_version: TERMS_VERSION,
          email_snapshot: emailTrim,
          accepted_at: new Date().toISOString(),
        })
      );
    }

    const { error } = await supabase.auth.signUp({
      email: emailTrim,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Cont creat! Verifică email-ul pentru confirmare.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Register</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

    <PasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Parolă"
  inputClassName="border p-2"
  autoComplete="new-password"
/>

      <div className="mt-4">
        <label className="flex items-start gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-white"
            checked={acceptTerms}
            onChange={(e) => {
              setAcceptTerms(e.target.checked);
              if (e.target.checked) setTermsError(null);
            }}
          />
          <span>
            Sunt de acord cu{" "}
            <a
              href="/termeni-si-conditii"
              className="text-white underline underline-offset-4 hover:text-white/90"
              target="_blank"
              rel="noreferrer"
            >
              Termenii și condițiile
            </a>
            .
          </span>
        </label>

        {termsError && <p className="mt-2 text-sm text-red-400">{termsError}</p>}
      </div>

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Creează cont
      </button>
    </div>
  );
}