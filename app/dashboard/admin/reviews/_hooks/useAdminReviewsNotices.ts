"use client";

import { useEffect } from "react";
import type { Notice } from "../_types/reviews";

export function useAdminReviewsNotices(
  notice: Notice,
  setNotice: (notice: Notice) => void
) {
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice, setNotice]);
}