"use client";

import type { SortMode } from "../_types/reviews";
import { AdminReviewsBulkActions } from "./AdminReviewsBulkActions";
import { AdminReviewsFilters } from "./AdminReviewsFilters";
import { AdminReviewsToolbarMeta } from "./AdminReviewsToolbarMeta";

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
    <div className="mt-6 space-y-4" data-testid="admin-reviews-toolbar">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <AdminReviewsFilters
          search={search}
          setSearch={setSearch}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          sortMode={sortMode}
          setSortMode={setSortMode}
        />

        <AdminReviewsToolbarMeta
          totalFiltered={totalFiltered}
          onExportCsv={onExportCsv}
        />
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