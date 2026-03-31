"use client";

import { supabase } from "@/lib/supabase";
import { savePendingMfaSetup } from "../_utils/mfaPendingStorage";

export function useMfaStartEnroll(state: {
  setActionLoading: (v: boolean) => void;
  setError: (v: string | null) => void;
  setFactorId: (v: string | null) => void;
  setQrCode: (v: string | null) => void;
  setSecret: (v: string | null) => void;
}) {
  const startEnroll = async () => {
    state.setActionLoading(true);
    state.setError(null);

    try {
      const existing = await supabase.auth.mfa.listFactors();
      if (existing.error) throw existing.error;

      const factors = existing.data?.totp ?? [];
      if (factors.length > 0) {
        state.setError("2FA este deja configurat sau în curs de activare.");
        return;
      }

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      });

      if (error) throw error;

      state.setFactorId(data.id);
      state.setQrCode(data.totp.qr_code);
      state.setSecret(data.totp.secret);

      savePendingMfaSetup({
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
      });
    } catch (e: any) {
      const msg = String(e?.message || "").toLowerCase();

      if (
        msg.includes("unprocessable") ||
        msg.includes("422") ||
        msg.includes("already") ||
        msg.includes("factor")
      ) {
        state.setError(
          "Ai deja un proces 2FA început. Te rog reîncarcă pagina sau finalizează configurarea."
        );
        return;
      }

      state.setError("Nu am putut porni configurarea 2FA.");
    } finally {
      state.setActionLoading(false);
    }
  };

  return { startEnroll };
}