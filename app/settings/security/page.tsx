"use client";

import Link from "next/link";
import { SecurityCard } from "./_components/SecurityCard";
import { MfaStatus } from "./_components/MfaStatus";
import { MfaEnroll } from "./_components/MfaEnroll";
import { MfaFactorList } from "./_components/MfaFactorList";
import { MfaEnableSection } from "./_components/MfaEnableSection";
import { useMfaSettings } from "./_hooks/useMfaSettings";
import { useResetMfa } from "./_hooks/useResetMfa";

export default function SecuritySettingsPage() {
  const mfa = useMfaSettings();
  const { resetMfa } = useResetMfa();

  return (
    <div className="space-bg min-h-dvh text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Securitate</h1>
            <p className="mt-2 text-white/70">
              Configurează autentificarea în 2 pași pentru contul tău.
            </p>
          </div>

          <Link
            href="/dashboard/user"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15"
          >
            Înapoi
          </Link>
        </div>

        <div className="mt-8">
          <SecurityCard title="Autentificare în 2 pași (2FA)">
            <MfaStatus
              loading={mfa.loading}
              error={mfa.error}
              hasTotpFactor={mfa.hasTotpFactor}
              aalLabel={mfa.aalLabel}
            />

            <MfaEnableSection
              loading={mfa.loading}
              qrCode={mfa.qrCode}
              actionLoading={mfa.actionLoading}
              hasTotpFactor={mfa.hasTotpFactor}
              onStartEnroll={mfa.startEnroll}
            />

            <MfaEnroll
              qrCode={mfa.qrCode}
              secret={mfa.secret}
              code={mfa.code}
              setCode={mfa.setCode}
              loading={mfa.actionLoading}
              onVerify={mfa.verifyEnroll}
            />

            <MfaFactorList
              factors={mfa.totpFactors}
              loading={mfa.actionLoading}
              onDisable={mfa.disableFactor}
            />
          </SecurityCard>
        </div>
      </div>
    </div>
  );
}