"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { TERMS_VERSION } from "@/app/terms";
import PasswordInput from "@/components/PasswordInput";
import { mapSupabaseAuthErrorToRo } from "@/utils/authErrorsRo";

type PendingTerms = {
  terms_version: string;
  email_snapshot?: string;
  accepted_at?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    const emailTrim = email.trim();

    if (!emailTrim) {
      setErrorMsg("Te rog introdu adresa de email.");
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMsg("Te rog introdu parola.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailTrim,
      password,
    });

    if (error) {
      setErrorMsg(mapSupabaseAuthErrorToRo(error.message));
      setLoading(false);
      return;
    }

    const user = data.user;
    const session = data.session;

    if (!user || !session) {
      setErrorMsg("Sesiunea nu este disponibilă. Reîncearcă.");
      setLoading(false);
      return;
    }

    let pending: PendingTerms | null = null;
    try {
      const raw = window.localStorage.getItem("pending_terms_acceptance");
      pending = raw ? JSON.parse(raw) : null;
    } catch {}

    const { data: existing } = await supabase
      .from("terms_acceptances")
      .select("id")
      .eq("user_id", user.id)
      .eq("terms_version", TERMS_VERSION)
      .maybeSingle();

    if (!existing) {
      await supabase.from("terms_acceptances").insert({
        user_id: user.id,
        terms_version: TERMS_VERSION,
        email_snapshot: pending?.email_snapshot ?? user.email ?? null,
        user_agent: navigator.userAgent,
      });

      window.localStorage.removeItem("pending_terms_acceptance");
    }

    const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single();

const role = profile?.role ?? "user";

router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  };

  return (
    <div
      className="space-bg h-dvh overflow-hidden flex items-center justify-center p-6"
      data-testid="login-page"
    >
      <div
        className="w-full max-w-sm animate-auth-in rounded-2xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md"
        data-testid="login-card"
      >
        <h1 className="text-3xl font-bold text-white" data-testid="login-title">
          Login
        </h1>
        <p className="mt-1 text-sm text-white/70">Intră în contul tău.</p>

        <form
          onSubmit={handleLogin}
          className="mt-6 flex flex-col gap-3"
          data-testid="login-form"
          noValidate
        >
          <label htmlFor="email" className="text-sm text-white/70">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={loading}
            data-testid="login-input-email"
            aria-invalid={!!errorMsg}
          />

          <label htmlFor="password" className="mt-2 text-sm text-white/70">
            Parolă
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={setPassword}
            placeholder="Parolă"
            className="w-full"
            inputClassName="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25"
            autoComplete="current-password"
            disabled={loading}
            dataTestId="login-input-password"
            toggleDataTestId="login-toggle-password"
          />

          {errorMsg && (
            <p
              id="login-error"
              className="mt-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
              data-testid="login-error"
              aria-live="polite"
            >
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
            data-testid="login-submit"
          >
            {loading ? "Se încarcă..." : "Loghează-te"}
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
      `}</style>
    </div>
  );
}