"use client";

import type { ReviewRow } from "../_types/reviews";
import AdminReviewStars from "./AdminReviewStars";
import { AdminReviewCardIdentity } from "./AdminReviewCardIdentity";
import { AdminReviewCardMeta } from "./AdminReviewCardMeta";

export function AdminReviewCardHeader({
  review,
  selected,
  onToggleSelected,
}: {
  review: ReviewRow;
  selected: boolean;
  onToggleSelected: (id: string) => void;
}) {
  return (
    <div
      className="min-w-0 flex-1"
      data-testid="admin-review-header"
      data-review-id={review.id}
    >
      <AdminReviewCardIdentity
        review={review}
        selected={selected}
        onToggleSelected={onToggleSelected}
      />

      <div className="mt-2" data-testid="admin-review-rating">
        <AdminReviewStars rating={Number(review.rating ?? 0)} />
      </div>

      <div
        className="mt-3 whitespace-pre-wrap text-sm text-white/75"
        data-testid="admin-review-comment"
      >
        {review.comment || "—"}
      </div>

      <AdminReviewCardMeta review={review} />
    </div>
  );
}