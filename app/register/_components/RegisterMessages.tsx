"use client";

export function RegisterMessages({
  errorMsg,
  successMsg,
  goToLogin,
}: {
  errorMsg: string | null;
  successMsg: string | null;
  goToLogin: () => void;
}) {
  const errorBox =
    "mt-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200";

  const successBox =
    "mt-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100";

  return (
    <>
      {errorMsg && <p className={errorBox}>{errorMsg}</p>}

      {successMsg && (
        <div className={successBox}>
          <p>{successMsg}</p>
          <button
            type="button"
            onClick={goToLogin}
            className="mt-3 w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Mergi la login
          </button>
        </div>
      )}
    </>
  );
}