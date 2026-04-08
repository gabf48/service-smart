"use client";

import { MfaEnableButton } from "./MfaEnableButton";

export function MfaEnableSection({
  loading,
  qrCode,
  actionLoading,
  hasTotpFactor,
  onStartEnroll,
}: {
  loading: boolean;
  qrCode: string | null;
  actionLoading: boolean;
  hasTotpFactor: boolean;
  onStartEnroll: () => void;
}) {
  if (loading || qrCode) return null;

  return (
    <div className="mt-6">
      <MfaEnableButton
        disabled={actionLoading || hasTotpFactor}
        onClick={onStartEnroll}
      />
    </div>
  );
}