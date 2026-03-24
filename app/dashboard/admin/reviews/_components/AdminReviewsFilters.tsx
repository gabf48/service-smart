"use client";

import type { SortMode } from "../_types/reviews";

export function AdminReviewsFilters({
  search,
  setSearch,
  ratingFilter,
  setRatingFilter,
  sortMode,
  setSortMode,
}: {
  search: string;
  setSearch: (value: string) => void;
  ratingFilter: number | "all";
  setRatingFilter: (value: number | "all") => void;
  sortMode: SortMode;
  setSortMode: (value: SortMode) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        id="admin-reviews-search"
        name="admin-reviews-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Caută după nume, comentariu, email..."
        data-testid="admin-reviews-search"
        className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-500/50 focus:outline-none sm:w-80"
      />

      <select
        id="admin-reviews-rating-filter"
        name="admin-reviews-rating-filter"
        value={ratingFilter}
        onChange={(e) =>
          setRatingFilter(e.target.value === "all" ? "all" : Number(e.target.value))
        }
        data-testid="admin-reviews-rating-filter"
        className="rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
      >
        <option value="all" className="bg-gray-900">
          Toate rating-urile
        </option>
        <option value="5" className="bg-gray-900">5 stele</option>
        <option value="4" className="bg-gray-900">4 stele</option>
        <option value="3" className="bg-gray-900">3 stele</option>
        <option value="2" className="bg-gray-900">2 stele</option>
        <option value="1" className="bg-gray-900">1 stea</option>
      </select>

      <select
        id="admin-reviews-sort"
        name="admin-reviews-sort"
        value={sortMode}
        onChange={(e) => setSortMode(e.target.value as SortMode)}
        data-testid="admin-reviews-sort"
        className="rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none"
      >
        <option value="newest" className="bg-gray-900">
          Cele mai noi
        </option>
        <option value="rating_desc" className="bg-gray-900">
          Rating mare
        </option>
        <option value="rating_asc" className="bg-gray-900">
          Rating mic
        </option>
      </select>
    </div>
  );
}