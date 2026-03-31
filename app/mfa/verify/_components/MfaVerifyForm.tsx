"use client";

export function MfaVerifyForm({
  code,
  setCode,
  error,
  loading,
  onSubmit,
  onLogout,
}: {
  code: string;
  setCode: (value: string) => void;
  error: string | null;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-2xl border border-white/10 bg-black/30 p-6"
    >
      <h1 className="text-xl font-bold">Verificare 2FA</h1>

      <p className="mt-2 text-sm text-white/70">
        Introdu codul din aplicația Authenticator.
      </p>

      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
        placeholder="Cod 6 cifre"
        autoFocus
      />

      {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Se verifică..." : "Confirmă"}
      </button>

      <button
        onClick={onLogout}
        type="button"
        className="mt-3 w-full rounded-xl bg-white/10 py-3 font-semibold hover:bg-white/15"
      >
        Logout
      </button>
    </form>
  );
}