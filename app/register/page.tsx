"use client";

import React, { useMemo, useState } from "react";
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

  // --- email helpers
  const emailTrim = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailInvalid = emailTrim.length > 0 && !emailRegex.test(emailTrim);

  // --- password requirements
  const req = useMemo(() => {
    const p = password || "";
    const length8 = p.length >= 8;
    const upper = /[A-Z]/.test(p);
    const digit = /[0-9]/.test(p);
    const special = /[^A-Za-z0-9]/.test(p);
    return { length8, upper, digit, special };
  }, [password]);

  const strength = useMemo(() => {
    const p = password || "";
    if (!p) return { label: "", score: 0 };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { label: "Slabă", score: 1 };
    if (score === 2) return { label: "Ok", score: 2 };
    if (score === 3) return { label: "Bună", score: 3 };
    return { label: "Foarte bună", score: 4 };
  }, [password]);

  const barClass =
    strength.score <= 1
      ? "bg-red-500"
      : strength.score === 2
      ? "bg-amber-400"
      : strength.score === 3
      ? "bg-emerald-400"
      : "bg-emerald-500";

  const canSubmit =
    !!emailTrim &&
    emailRegex.test(emailTrim) &&
    !!password &&
    !!password2 &&
    password.length >= 6 &&
    password === password2 &&
    acceptTerms &&
    !loading;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // frontend validations (RO)
    if (!emailTrim) {
      setErrorMsg("Te rog introdu adresa de email.");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(emailTrim)) {
      setErrorMsg("Adresa de email nu este validă.");
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMsg("Te rog introdu parola.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Parola trebuie să aibă minim 6 caractere.");
      setLoading(false);
      return;
    }

    if (password !== password2) {
      setErrorMsg("Parolele nu coincid.");
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("Trebuie să accepți Termenii și condițiile.");
      setLoading(false);
      return;
    }

    // pending terms -> insert after first login
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

  const pageBg =
    "space-bg h-dvh overflow-hidden flex items-center justify-center p-6";

  const inputBase =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition";

  const errorBox =
    "mt-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200";

  const successBox =
    "mt-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100";

  const reqItem = (ok: boolean, label: string) => (
    <li className={`flex items-center gap-2 text-xs ${ok ? "text-emerald-200" : "text-white/55"}`}>
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
          ok ? "border-emerald-400/50 bg-emerald-500/20" : "border-white/15 bg-white/5"
        }`}
      >
        {ok ? "✓" : ""}
      </span>
      <span>{label}</span>
    </li>
  );

  return (
    <div className={pageBg}>
      <div
        className={`w-full max-w-sm rounded-2xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md animate-auth-in ${
          errorMsg ? "shake" : ""
        }`}
      >
        <h1 className="text-3xl font-bold text-white">Register</h1>
        <p className="mt-1 text-sm text-white/70">Creează un cont nou.</p>

        <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-3">
          <label className="text-sm text-white/70">Email</label>
          <input
            type="email"
            placeholder="Email"
            className={`${inputBase} ${
              emailInvalid ? "border-red-500/60 focus:ring-red-500/20" : ""
            }`}
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
            inputClassName={inputBase}
            autoComplete="new-password"
            disabled={loading}
          />

          {/* Strength + checklist (only when user starts typing) */}
          {password.length > 0 && (
            <div className="mt-1 rounded-xl border border-white/10 bg-white/5 p-3 transition-all">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Putere parolă</span>
                <span>{strength.label}</span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${barClass} transition-all duration-300`}
                  style={{ width: `${(strength.score / 4) * 100}%` }}
                />
              </div>

              <ul className="mt-3 grid grid-cols-1 gap-2">
                {reqItem(req.length8, "Minim 8 caractere")}
                {reqItem(req.upper, "O literă mare (A-Z)")}
                {reqItem(req.digit, "Un număr (0-9)")}
                {reqItem(req.special, "Un caracter special (!@#$...)")}
              </ul>
            </div>
          )}

          <label className="mt-2 text-sm text-white/70">Confirmă parola</label>
          <PasswordInput
            value={password2}
            onChange={setPassword2}
            placeholder="Confirmă parola"
            className="w-full"
            inputClassName={inputBase}
            autoComplete="new-password"
            disabled={loading}
          />

          <label className="mt-3 flex items-start gap-3 text-sm text-white/80">
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
                className="underline underline-offset-4 hover:text-white/90"
                target="_blank"
                rel="noreferrer"
              >
                Termenii și condițiile
              </a>
              .
            </span>
          </label>

          {errorMsg && <p className={errorBox}>{errorMsg}</p>}
          {successMsg && <p className={successBox}>{successMsg}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-4 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Se încarcă..." : "Creează cont"}
          </button>
        </form>
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
        .shake {
          animation: shake 260ms ease-in-out;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}