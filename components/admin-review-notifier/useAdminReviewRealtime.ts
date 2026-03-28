"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAdminReviewRealtime(playSound: () => void) {
  const [notice, setNotice] = useState<string | null>(null);
  const initialLoadDoneRef = useRef(false);

  useEffect(() => {
    const channel = supabase
      .channel("global-admin-review-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews",
        },
        () => {
          if (!initialLoadDoneRef.current) {
            initialLoadDoneRef.current = true;
            return;
          }

          setNotice("A sosit un review nou.");
          playSound();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [playSound]);

  return {
    notice,
    clearNotice: () => setNotice(null),
  };
}