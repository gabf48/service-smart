"use client";

export function ResetPasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  canReset,
  saving,
  errorMsg,
  successMsg,
  onSubmit,
}: {
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  canReset: boolean;
  saving: boolean;
  errorMsg: string | null;
  successMsg: string | null;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
      <input
        type="password"
        placeholder="Parolă nouă"
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={!canReset || saving}
      />

      <input
        type="password"
        placeholder="Confirmă parola"
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={!canReset || saving}
      />

      {errorMsg && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {errorMsg}
        </p>
      )}

      {successMsg && (
        <p className="rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-200">
          {successMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={saving || !canReset}
        className="mt-3 rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-60"
      >
        {saving ? "Se salvează..." : "Resetează parola"}
      </button>
    </form>
  );
}