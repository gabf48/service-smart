"use client";

import { supabase } from "@/lib/supabase";
import type { AalValue, TotpFactor } from "../_utils/mfaLabels";

export function useMfaSettingsLoad(state: {
  setLoading: (v: boolean) => void;
  setError: (v: string | null) => void;
  setTotpFactors: (v: TotpFactor[]) => void;
  setHasTotpFactor: (v: boolean) => void;
  setAal: (v: AalValue) => void;
}) {
  const load = async () => {
    state.setLoading(true);
    state.setError(null);

    try {
      const [{ data: factorsData, error: factorsError }, { data: aalData, error: aalError }] =
        await Promise.all([
          supabase.auth.mfa.listFactors(),
          supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        ]);

      if (factorsError) throw factorsError;
      if (aalError) throw aalError;

      const totp = (factorsData?.totp ?? []) as TotpFactor[];
      const currentAal = (aalData?.currentLevel as AalValue | undefined) ?? "unknown";
      const nextAal = aalData?.nextLevel ?? "unknown";

      state.setTotpFactors(totp);

      // important:
      // dacă userul e aal1 dar nextLevel e aal2, înseamnă că are MFA înscris dar neverificat
      state.setHasTotpFactor(totp.length > 0 || (currentAal === "aal1" && nextAal === "aal2"));
      state.setAal(currentAal);
    } catch (e: any) {
      state.setError(e?.message || "Nu am putut încărca setările MFA.");
    } finally {
      state.setLoading(false);
    }
  };

  return { load };
}