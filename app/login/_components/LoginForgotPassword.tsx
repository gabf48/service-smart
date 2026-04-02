"use client";

export function LoginForgotPassword({
  loading,
  onForgotPassword,
}: {
  loading: boolean;
  onForgotPassword: () => void;
}) {
  
  return (
    <button
      type="button"
      onClick={onForgotPassword}
      disabled={loading}
      className="self-start text-sm text-blue-400 transition hover:text-blue-300 disabled:opacity-60"
      data-testid="login-forgot-password"
    >
      Ai uitat parola?
    </button>
  );
}