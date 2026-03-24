"use client";

import { useMemo } from "react";
import type { ReviewRow } from "../_hooks/useReviews";

export function useSortedReviews(reviews: ReviewRow[]) {
  return useMemo(() => {
    const arr = [...(reviews || [])];

    arr.sort((a, b) => {
      const ra = a.rating ?? 0;
      const rb = b.rating ?? 0;
      if (rb !== ra) return rb - ra;

      const ta = a.created_at ? Date.parse(a.created_at) : 0;
      const tb = b.created_at ? Date.parse(b.created_at) : 0;
      return tb - ta;
    });

    return arr;
  }, [reviews]);
}