"use client";

import type { ReviewRow, ReviewsTab } from "../_types/reviews";
import { AdminReviewCard } from "./AdminReviewCard";

export function AdminReviewsList({
  loading,
  reviews,
  tab,
  busyId,
  selectedIds,
  onToggleSelected,
  onApprove,
  onMoveToPending,
  onReject,
}: {
  loading: boolean;
  reviews: ReviewRow[];
  tab: ReviewsTab;
  busyId: string | null;
  selectedIds: string[];
  onToggleSelected: (id: string) => void;
  onApprove: (id: string) => void;
  onMoveToPending: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        Se încarcă…
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <div className="text-xl font-semibold">Nimic aici</div>
        <div className="mt-2 text-sm text-white/70">
          {tab === "pending"
            ? "Nu există review-uri în așteptare."
            : "Nu există review-uri aprobate încă."}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {reviews.map((review) => (
        <AdminReviewCard
          key={review.id}
          review={review}
          busy={busyId === review.id}
          selected={selectedIds.includes(review.id)}
          onToggleSelected={onToggleSelected}
          onApprove={onApprove}
          onMoveToPending={onMoveToPending}
          onReject={onReject}
        />
      ))}
    </div>
  );
}