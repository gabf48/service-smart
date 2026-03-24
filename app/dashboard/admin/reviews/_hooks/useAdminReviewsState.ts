"use client";

import { useState } from "react";
import type { Notice, ReviewRow } from "../_types/reviews";

export function useAdminReviewsState() {
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);

  return {
    loading,
    setLoading,
    busyId,
    setBusyId,
    notice,
    setNotice,
    reviews,
    setReviews,
  };
}