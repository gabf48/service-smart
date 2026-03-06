"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { ReviewRow, ReviewsTab, Notice } from "../_types/reviews";
import { useReviewNotifier } from "./useReviewNotifier";

export function useAdminReviewsRealtime({
  setReviews,
  setNotice,
  tab,
}: {
  setReviews: React.Dispatch<React.SetStateAction<ReviewRow[]>>;
  setNotice: React.Dispatch<React.SetStateAction<Notice>>;
  tab: ReviewsTab;
}) {
  const [newPendingCount, setNewPendingCount] = useState(0);
  const initialLoadDoneRef = useRef(false);
  const { playNewReviewSound } = useReviewNotifier();

  useEffect(() => {
    if (tab === "pending") setNewPendingCount(0);
  }, [tab]);

  useEffect(() => {
    const channel = supabase
      .channel("admin-reviews-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        async (payload) => {
          console.log("[Realtime payload]", payload);

          const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("[Realtime fetch error]", error);
            return;
          }

          const nextReviews = (data ?? []) as ReviewRow[];

          if (initialLoadDoneRef.current) {
            if (payload.eventType === "INSERT") {
              setNewPendingCount((prev) => prev + 1);
              setNotice({
                type: "success",
                text: "A sosit un review nou.",
              });
              playNewReviewSound();
            }
          } else {
            initialLoadDoneRef.current = true;
          }

          setReviews(nextReviews);
        }
      )
      .subscribe((status) => {
        console.log("[Realtime status]", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setReviews, setNotice, playNewReviewSound]);

  return { newPendingCount };
}