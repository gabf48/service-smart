"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TERMS_VERSION } from "@/app/terms";
import PasswordInput from "@/components/PasswordInput";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const emailTrim = email.trim();

    if (!emailTrim) {
      setErrorMsg("Te rog introdu adresa de email.");
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("Trebuie să accepți Termenii și condițiile ca să îți creezi cont.");
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMsg("Te rog introdu parola.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Parola trebuie să aibă cel puțin 6 caractere.");
      setLoading(false);
      return;
    }

    if (!password2) {
      setErrorMsg("Te rog confirmă parola.");
      setLoading(false);
      return;
    }

    if (password !== password2) {
      setErrorMsg("Parolele nu coincid.");
      setLoading(false);
      return;
    }

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
      setErrorMsg(mapSupabaseAuthErrorToRo(error.message));
      setLoading(false);
      return;
    }

    setSuccessMsg("Cont creat! Verifică email-ul pentru confirmare.");
    setLoading(false);
  };

  const pageBg = "space-bg h-dvh overflow-hidden flex items-center justify-center p-6";

  return (
    <div className={pageBg}>
      <div className="w-full max-w-sm animate-auth-in rounded-2xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white">Register</h1>
        <p className="mt-1 text-sm text-white/70">Creează un cont nou.</p>

        <div className="mt-6 flex flex-col gap-3">
          <label className="text-sm text-white/70">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={loading}
          />

          <label className="mt-2 text-sm text-white/70">Parolă</label>
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Parolă"
            className="w-full"
            inputClassName="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25"
            autoComplete="new-password"
            disabled={loading}
          />

          <label className="mt-2 text-sm text-white/70">Confirmă parola</label>
          <PasswordInput
            value={password2}
            onChange={setPassword2}
            placeholder="Confirmă parola"
            className="w-full"
            inputClassName="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25"
            autoComplete="new-password"
            disabled={loading}
          />

          <div className="mt-3">
            <label className="flex items-start gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-white"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={loading}
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
          </div>

          {errorMsg && (
            <p className="mt-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="mt-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
              {successMsg}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Se încarcă..." : "Creează cont"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-auth-in {
          animation: authIn 220ms ease-out both;
        }
        @keyframes authIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}