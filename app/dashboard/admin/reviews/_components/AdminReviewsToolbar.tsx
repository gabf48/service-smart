"use client";

import type { SortMode } from "../_types/reviews";
import { AdminReviewsBulkActions } from "./AdminReviewsBulkActions";

export function AdminReviewsToolbar({
  search,
  setSearch,
  ratingFilter,
  setRatingFilter,
  sortMode,
  setSortMode,
  totalFiltered,
  selectedCount,
  onSelectAllVisible,
  onClearSelection,
  onBulkApprove,
  onBulkMoveToPending,
  onBulkDelete,
  onExportCsv,
  canBulkApprove,
  canBulkMoveToPending,
}: {
  search: string;
  setSearch: (value: string) => void;
  ratingFilter: number | "all";
  setRatingFilter: (value: number | "all") => void;
  sortMode: SortMode;
  setSortMode: (value: SortMode) => void;
  totalFiltered: number;
  selectedCount: number;
  onSelectAllVisible: () => void;
  onClearSelection: () => void;
  onBulkApprove: () => void;
  onBulkMoveToPending: () => void;
  onBulkDelete: () => void;
  onExportCsv: () => void;
  canBulkApprove: boolean;
  canBulkMoveToPending: boolean;
}) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută după nume, comentariu, email..."
            className="w-full sm:w-80 rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
          />

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
          >
            <option value="all" className="bg-gray-900">Toate rating-urile</option>
            <option value="5" className="bg-gray-900">5 stele</option>
            <option value="4" className="bg-gray-900">4 stele</option>
            <option value="3" className="bg-gray-900">3 stele</option>
            <option value="2" className="bg-gray-900">2 stele</option>
            <option value="1" className="bg-gray-900">1 stea</option>
          </select>

          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
          >
            <option value="newest" className="bg-gray-900">Cele mai noi</option>
            <option value="rating_desc" className="bg-gray-900">Rating mare</option>
            <option value="rating_asc" className="bg-gray-900">Rating mic</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-white/60">
            Rezultate: <span className="text-white font-semibold">{totalFiltered}</span>
          </span>

          <button
            type="button"
            onClick={onExportCsv}
            className="rounded-xl bg-white/10 px-4 py-2 font-semibold hover:bg-white/15 transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      <AdminReviewsBulkActions
        selectedCount={selectedCount}
        onSelectAllVisible={onSelectAllVisible}
        onClearSelection={onClearSelection}
        onBulkApprove={onBulkApprove}
        onBulkMoveToPending={onBulkMoveToPending}
        onBulkDelete={onBulkDelete}
        canBulkApprove={canBulkApprove}
        canBulkMoveToPending={canBulkMoveToPending}
      />
    </div>
  );
}