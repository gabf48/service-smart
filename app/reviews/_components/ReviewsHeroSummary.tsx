"use client";

import { Stars } from "./Stars";

export function ReviewsHeroSummary({
  avg,
  count,
  onOpen,
}: {
  avg: number;
  count: number;
  onOpen: () => void;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md"
      data-testid="reviews-summary-card"
    >
      <div className="text-sm text-white/70">Media review-urilor</div>

      <div className="mt-2 flex items-center gap-3">
        <div
          className="text-3xl font-bold tabular-nums"
          data-testid="reviews-average-rating"
        >
          {count ? avg.toFixed(1) : "0.0"}
        </div>

        <div data-testid="reviews-average-stars">
          <Stars value={Math.round(avg)} />
        </div>

        <div className="text-sm text-white/60" data-testid="reviews-count">
          ({count})
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        data-testid="reviews-open-modal"
        className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700 active:scale-[0.99]"
      >
        Adaugă review
      </button>
    </div>
  );
}