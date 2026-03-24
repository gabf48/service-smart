"use client";

import type { AdminReviewsContentProps } from "../_types/reviewContent";
import { AdminReviewsTopSection } from "./AdminReviewsTopSection";
import { AdminReviewsMainSection } from "./AdminReviewsMainSection";

export function AdminReviewsContent(props: AdminReviewsContentProps) {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 py-10"
      data-testid="admin-reviews-container"
    >
      <AdminReviewsTopSection {...props} />
      <AdminReviewsMainSection {...props} />
    </div>
  );
}