"use client";

import { supabase } from "@/lib/supabase";
import { mapMfaErrorToMessage } from "../_utils/mapMfaErrorToMessage";
import { clearPendingMfaSetup } from "../_utils/mfaPendingStorage";
import { useMfaStartEnroll } from "./useMfaStartEnroll";

export function useMfaSettingsActions(state: {
  factorId: string | null;
  code: string;
  setActionLoading: (v: boolean) => void;
  setError: (v: string | null) => void;
  setFactorId: (v: string | null) => void;
  setQrCode: (v: string | null) => void;
  setSecret: (v: string | null) => void;
  setCode: (v: string) => void;
}) {
  const { startEnroll } = useMfaStartEnroll(state);

  const verifyEnroll = async (load: () => Promise<void>) => {
    if (!state.factorId || !state.code.trim()) return;

    state.setActionLoading(true);
    state.setError(null);

    try {
      const challenge = await supabase.auth.mfa.challenge({
        factorId: state.factorId,
      });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId: state.factorId,
        challengeId: challenge.data.id,
        code: state.code.trim(),
      });
      if (verify.error) throw verify.error;

      clearPendingMfaSetup();
      state.setCode("");
      state.setFactorId(null);
      state.setQrCode(null);
      state.setSecret(null);

      await load();
    } catch (e: any) {
      state.setError(mapMfaErrorToMessage(e?.message || ""));
    } finally {
      state.setActionLoading(false);
    }
  };

  const disableFactor = async (factorIdToRemove: string, load: () => Promise<void>) => {
    state.setActionLoading(true);
    state.setError(null);

    try {
      const { error } = await supabase.auth.mfa.unenroll({
        factorId: factorIdToRemove,
      });
      if (error) throw error;

      await load();
      clearPendingMfaSetup();
    } catch (e: any) {
      state.setError(mapMfaErrorToMessage(e?.message || ""));
    } finally {
      state.setActionLoading(false);
    }
  };

  return { startEnroll, verifyEnroll, disableFactor };
}