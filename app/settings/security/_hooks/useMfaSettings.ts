"use client";

import { useEffect } from "react";
import { mapAalLabel } from "../_utils/mfaLabels";
import { useMfaSettingsState } from "./useMfaSettingsState";
import { useMfaSettingsLoad } from "./useMfaSettingsLoad";
import { useMfaSettingsActions } from "./useMfaSettingsActions";
import { readPendingMfaSetup } from "../_utils/mfaPendingStorage";

export function useMfaSettings() {
  const state = useMfaSettingsState();

  const { load } = useMfaSettingsLoad({
    setLoading: state.setLoading,
    setError: state.setError,
    setTotpFactors: state.setTotpFactors,
    setHasTotpFactor: state.setHasTotpFactor,
    setAal: state.setAal,
  });

  const actions = useMfaSettingsActions({
    factorId: state.factorId,
    code: state.code,
    setActionLoading: state.setActionLoading,
    setError: state.setError,
    setFactorId: state.setFactorId,
    setQrCode: state.setQrCode,
    setSecret: state.setSecret,
    setCode: state.setCode,
  });

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
  const pending = readPendingMfaSetup();
  if (!pending) return;

  state.setFactorId(pending.factorId);
  state.setQrCode(pending.qrCode);
  state.setSecret(pending.secret);
}, []);

  return {
    loading: state.loading,
    actionLoading: state.actionLoading,
    error: state.error,
    hasTotpFactor: state.hasTotpFactor,
    totpFactors: state.totpFactors,
    aal: state.aal,
    aalLabel: mapAalLabel(state.aal),
    qrCode: state.qrCode,
    secret: state.secret,
    code: state.code,
    setCode: state.setCode,
    startEnroll: actions.startEnroll,
    verifyEnroll: () => actions.verifyEnroll(load),
    disableFactor: (factorId: string) => actions.disableFactor(factorId, load),
  };
}