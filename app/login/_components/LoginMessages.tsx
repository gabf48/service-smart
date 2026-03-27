"use client";

export function LoginMessages({
  errorMsg,
  forgotError,
  forgotMsg,
}: {
  errorMsg: string | null;
  forgotError: string | null;
  forgotMsg: string | null;
}) {
  return (
    <>
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

      {forgotError && (
        <p
          className="mt-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
          data-testid="login-forgot-password-error"
          aria-live="polite"
        >
          {forgotError}
        </p>
      )}

      {forgotMsg && (
        <p
          className="mt-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
          data-testid="login-forgot-password-success"
          aria-live="polite"
        >
          {forgotMsg}
        </p>
      )}
    </>
  );
}