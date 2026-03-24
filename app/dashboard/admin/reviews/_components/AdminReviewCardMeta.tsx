"use client";

import type { ReviewRow } from "../_types/reviews";
import { fmtReviewDate } from "../_utils/reviewFormat";

export function AdminReviewCardMeta({ review }: { review: ReviewRow }) {
  return (
    <div
      className="mt-4 flex flex-wrap gap-3 text-xs text-white/60"
      data-testid="admin-review-meta"
    >
      {review.created_at ? (
        <span
          className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
          data-testid="admin-review-date"
        >
          {fmtReviewDate(review.created_at)}
        </span>
      ) : null}

      {review.email ? (
        <span
          className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
          data-testid="admin-review-email"
        >
          {review.email}
        </span>
      ) : null}

      {review.phone ? (
        <span
          className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
          data-testid="admin-review-phone"
        >
          {review.phone}
        </span>
      ) : null}
    </div>
  );
}