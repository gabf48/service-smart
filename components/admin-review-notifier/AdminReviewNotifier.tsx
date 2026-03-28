"use client";

import { useReviewNotifier } from "@/app/dashboard/admin/reviews/_hooks/useReviewNotifier";
import { AdminReviewToast } from "./AdminReviewToast";
import { useAdminReviewRealtime } from "./useAdminReviewRealtime";

export function AdminReviewNotifier() {
  const { playNewReviewSound } = useReviewNotifier();
  const { notice, clearNotice } = useAdminReviewRealtime(playNewReviewSound);

  return <AdminReviewToast text={notice} onClose={clearNotice} />;
}