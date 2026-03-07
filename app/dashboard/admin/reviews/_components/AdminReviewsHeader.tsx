"use client";

import type { ReviewsTab } from "../_types/reviews";

export function AdminReviewsHeader({
  tab,
  setTab,
  pendingCount,
  approvedCount,
  onRefresh,
  newPendingCount,
}: {
  tab: ReviewsTab;
  setTab: (t: ReviewsTab) => void;
  pendingCount: number;
  approvedCount: number;
  onRefresh: () => void;
  newPendingCount: number;
}) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      data-testid="admin-reviews-header"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">Reviews</h1>
        <p className="text-white/70 text-sm">
          Aprobă sau respinge review-urile înainte să apară public.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setTab("pending")}
          data-testid="admin-reviews-tab-pending"
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "pending"
              ? "bg-amber-500 text-black"
              : "bg-white/10 text-white hover:bg-white/15"
          }`}
        >
          Pending {pendingCount}
          {newPendingCount > 0 && (
            <span className="ml-2 text-xs text-red-400">
              +{newPendingCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setTab("approved")}
          data-testid="admin-reviews-tab-approved"
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            tab === "approved"
              ? "bg-emerald-500 text-black"
              : "bg-white/10 text-white hover:bg-white/15"
          }`}
        >
          Approved {approvedCount}
        </button>

        <button
          type="button"
          onClick={onRefresh}
          data-testid="admin-reviews-refresh"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}