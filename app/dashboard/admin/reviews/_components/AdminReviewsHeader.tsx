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
  setTab: (tab: ReviewsTab) => void;
  pendingCount: number;
  approvedCount: number;
  onRefresh: () => void;
  newPendingCount: number;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <div className="text-xs text-white/60">Admin</div>
        <h1 className="mt-1 text-3xl font-bold">Reviews</h1>
        <p className="mt-2 text-white/70">
          Aprobă sau respinge review-urile înainte să apară public.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setTab("pending")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-semibold transition relative",
              tab === "pending"
                ? "bg-white/10 ring-1 ring-white/15"
                : "hover:bg-white/5 text-white/80",
            ].join(" ")}
          >
            Pending{" "}
            <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {pendingCount}
            </span>

            {newPendingCount > 0 && tab !== "pending" && (
              <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                +{newPendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab("approved")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-semibold transition",
              tab === "approved"
                ? "bg-white/10 ring-1 ring-white/15"
                : "hover:bg-white/5 text-white/80",
            ].join(" ")}
          >
            Approved{" "}
            <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {approvedCount}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}