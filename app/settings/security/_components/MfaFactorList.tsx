"use client";

import { MfaDisableButton } from "./MfaDisableButton";

export function MfaFactorList({
  factors,
  loading,
  onDisable,
}: {
  factors: Array<{ id: string; friendly_name?: string | null }>;
  loading: boolean;
  onDisable: (factorId: string) => void;
}) {
  if (!factors.length) return null;

  return (
    <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-sm text-white/60">Factori activi</div>

      {factors.map((factor) => (
        <div
          key={factor.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <div>
            <div className="font-semibold">
              {factor.friendly_name || "Authenticator App"}
            </div>
            <div className="text-sm text-white/60 break-all">{factor.id}</div>
          </div>

          <MfaDisableButton
            disabled={loading}
            onClick={() => onDisable(factor.id)}
          />
        </div>
      ))}
    </div>
  );
}