"use client";

import { useState } from "react";
import type { AalValue, TotpFactor } from "../_utils/mfaLabels";

export function useMfaSettingsState() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hasTotpFactor, setHasTotpFactor] = useState(false);
  const [totpFactors, setTotpFactors] = useState<TotpFactor[]>([]);
  const [aal, setAal] = useState<AalValue>("unknown");

  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");

  return {
    loading,
    setLoading,
    actionLoading,
    setActionLoading,
    error,
    setError,
    hasTotpFactor,
    setHasTotpFactor,
    totpFactors,
    setTotpFactors,
    aal,
    setAal,
    factorId,
    setFactorId,
    qrCode,
    setQrCode,
    secret,
    setSecret,
    code,
    setCode,
  };
}