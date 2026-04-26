"use client";

import { useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("5");

  const sorted = useSortedReviews(reviews);

  const filtered = useMemo(() => {
    return sorted.filter((r) => {
      const matchesRating =
        ratingFilter === "all"
          ? true
          : Number(r.rating ?? 0) === Number(ratingFilter);

      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (r.display_name || "").toLowerCase().includes(q) ||
        (r.comment || "").toLowerCase().includes(q);

      return matchesRating && matchesSearch;
    });
  }, [sorted, search, ratingFilter]);

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

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Caută după nume sau review..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/60"
        />

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white focus:outline-none"
        >
          <option value="all">Toate review-urile</option>
          <option value="5">5 stele</option>
          <option value="4">4 stele</option>
          <option value="3">3 stele</option>
          <option value="2">2 stele</option>
          <option value="1">1 stea</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-6 text-white/70">
          Se încarcă review-urile…
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/75">
          Nu există review-uri pentru filtrul selectat.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </section>
  );
}