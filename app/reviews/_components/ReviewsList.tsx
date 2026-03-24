"use client";

import { useSortedReviews } from "./useSortedReviews";
import { ReviewCard } from "./ReviewCard";
import type { ReviewRow } from "../_hooks/useReviews";

export function ReviewsList({
  reviews,
  loading,
  onRefresh,
}: {
  reviews: ReviewRow[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const sorted = useSortedReviews(reviews);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ce spun clienții
        </h2>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/15"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="mt-6 text-white/70">
          Se încarcă review-urile…
        </div>
      ) : sorted.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/75">
          Încă nu există review-uri aprobate.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {sorted.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </section>
  );
}