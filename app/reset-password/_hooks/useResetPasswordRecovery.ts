"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { mapResetPasswordErrorToRo } from "../_utils/resetPasswordErrors";

export function useResetPasswordRecovery({
  setErrorMsg,
  setCanReset,
  setLoading,
}: {
  setErrorMsg: (value: string | null) => void;
  setCanReset: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}) {
  useEffect(() => {
    const checkRecoveryState = async () => {
      const hash = window.location.hash.replace(/^#/, "");
      const params = new URLSearchParams(hash);

      const hashError = params.get("error");
      const hashErrorCode = params.get("error_code");
      const hashErrorDescription = params.get("error_description");

      if (hashError || hashErrorCode) {
        setErrorMsg(
          mapResetPasswordErrorToRo(
            hashErrorDescription ||
              hashErrorCode ||
              hashError ||
              "invalid recovery link"
          )
        );
        setCanReset(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setErrorMsg("Linkul de resetare este invalid sau a expirat.");
        setCanReset(false);
        setLoading(false);
        return;
      }

      setCanReset(true);
      setLoading(false);
    };

    checkRecoveryState();
  }, [setErrorMsg, setCanReset, setLoading]);
}