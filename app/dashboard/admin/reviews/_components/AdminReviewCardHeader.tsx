"use client";

import type { ReviewRow } from "../_types/reviews";
import AdminReviewStars from "./AdminReviewStars";

function fmtDate(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("ro-RO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminReviewCardHeader({
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
    <div
      className="min-w-0 flex-1"
      data-testid="admin-review-header"
      data-review-id={review.id}
    >
      <div className="flex flex-wrap items-center gap-3">
        <label
          className="inline-flex items-center gap-2 text-sm text-white/70 cursor-pointer"
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
          className="text-lg font-semibold truncate"
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

      <div className="mt-2" data-testid="admin-review-rating">
        <AdminReviewStars rating={Number(review.rating ?? 0)} />
      </div>

      <div
        className="mt-3 text-sm text-white/75 whitespace-pre-wrap"
        data-testid="admin-review-comment"
      >
        {review.comment || "—"}
      </div>

      <div
        className="mt-4 flex flex-wrap gap-3 text-xs text-white/60"
        data-testid="admin-review-meta"
      >
        {review.created_at ? (
          <span
            className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
            data-testid="admin-review-date"
          >
            {fmtDate(review.created_at)}
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
    </div>
  );
}