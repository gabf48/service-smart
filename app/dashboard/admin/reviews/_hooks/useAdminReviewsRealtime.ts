"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { ReviewRow, ReviewsTab } from "../_types/reviews";
import { useReviewNotifier } from "./useReviewNotifier";

export function useAdminReviewsRealtime({
  reviews,
  setReviews,
  setNotice,
  tab,
}: {
  reviews: ReviewRow[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewRow[]>>;
  setNotice: (notice: { type: "success" | "error"; text: string } | null) => void;
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
        { event: "*", schema: "public", table: "reviews" },
        async (payload) => {
          const oldPendingCount = reviews.filter((r) => r.is_approved !== true).length;

          const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) return;

          const nextReviews = (data ?? []) as ReviewRow[];
          const nextPendingCount = nextReviews.filter((r) => r.is_approved !== true).length;

          if (initialLoadDoneRef.current) {
            if (payload.eventType === "INSERT" && nextPendingCount > oldPendingCount) {
              setNewPendingCount((prev) => prev + 1);
              setNotice({ type: "success", text: "A sosit un review nou." });
              playNewReviewSound();
            }
          } else {
            initialLoadDoneRef.current = true;
          }

          setReviews(nextReviews);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [reviews, setNotice, setReviews, playNewReviewSound]);

  return { newPendingCount };
}