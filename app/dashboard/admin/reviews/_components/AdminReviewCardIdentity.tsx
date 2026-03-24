"use client";

import type { ReviewRow } from "../_types/reviews";

export function AdminReviewCardIdentity({
  review,
  selected,
  onToggleSelected,
}: {
  review: ReviewRow;
  selected: boolean;
  onToggleSelected: (id: string) => void;
}) {
  const name = review.display_name || (review.user_id ? "User" : "Anonim");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/70"
        data-testid="admin-review-select"
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelected(review.id)}
          className="accent-blue-500"
          data-testid="admin-review-checkbox"
        />
      </label>

      <div
        className="truncate text-lg font-semibold"
        data-testid="admin-review-name"
      >
        {name}
      </div>

      <span
        className={[
          "inline-flex items-center rounded-full px-3 py-1 text-xs ring-1",
          review.is_approved
            ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/20"
            : "bg-amber-500/10 text-amber-200 ring-amber-500/20",
        ].join(" ")}
        data-testid="admin-review-status"
        data-review-status={review.is_approved ? "approved" : "pending"}
      >
        {review.is_approved ? "Approved" : "Pending"}
      </span>
    </div>
  );
}