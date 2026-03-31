"use client";

export function MfaStatus({
  loading,
  error,
  hasTotpFactor,
  aalLabel,
}: {
  loading: boolean;
  error: string | null;
  hasTotpFactor: boolean;
  aalLabel: string;
}) {
  if (loading) {
    return <div className="text-white/70">Se încarcă statusul MFA...</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-sm text-white/60">Status 2FA</div>
        <div className="mt-1 text-lg font-semibold">
          {hasTotpFactor ? "Activat" : "Neactivat"}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-sm text-white/60">Nivel sesiune</div>
        <div className="mt-1 text-lg font-semibold">{aalLabel}</div>
      </div>

      <div className="text-sm text-white/70">
        Pasul următor: adăugăm butonul de activare și QR code-ul.
      </div>
    </div>
  );
}