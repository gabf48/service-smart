"use client";

import { useState } from "react";
import { MfaManualKey } from "./MfaManualKey";

export function MfaEnroll({
  qrCode,
  secret,
  code,
  setCode,
  loading,
  onVerify,
}: {
  qrCode: string | null;
  secret: string | null;
  code: string;
  setCode: (value: string) => void;
  loading: boolean;
  onVerify: () => void;
}) {
  const [toast, setToast] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  if (!qrCode || !secret) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setToast("Cheia a fost copiată.");
      setTimeout(() => setToast(null), 2000);
    } catch {
      setToast("Nu am putut copia cheia.");
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onVerify();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5"
    >
      {toast && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {toast}
        </div>
      )}

      <div>
        <div className="text-sm text-white/60">Scanează codul QR</div>
        <div
          className="mt-3 inline-block rounded-xl bg-white p-3"
          dangerouslySetInnerHTML={{ __html: qrCode }}
        />
      </div>

      <MfaManualKey
        secret={secret}
        showSecret={showSecret}
        onToggleSecret={() => setShowSecret((v) => !v)}
        onCopy={handleCopy}
      />

      <div>
        <label className="mb-1 block text-sm text-white/70">
          Cod din aplicația Authenticator
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/25"
          placeholder="Cod 6 cifre"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "Se verifică..." : "Confirmă 2FA"}
      </button>
    </form>
  );
}