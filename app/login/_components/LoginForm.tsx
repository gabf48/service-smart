"use client";

import PasswordInput from "@/components/PasswordInput";
import { LoginForgotPassword } from "./LoginForgotPassword";
import { LoginMessages } from "./LoginMessages";

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  errorMsg,
  forgotMsg,
  forgotError,
  onSubmit,
  onForgotPassword,
}: {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  errorMsg: string | null;
  forgotMsg: string | null;
  forgotError: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
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

      <LoginForgotPassword
        loading={loading}
        onForgotPassword={onForgotPassword}
      />

      <LoginMessages
        errorMsg={errorMsg}
        forgotError={forgotError}
        forgotMsg={forgotMsg}
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
        data-testid="login-submit"
      >
        {loading ? "Se încarcă..." : "Loghează-te"}
      </button>
    </form>
  );
}