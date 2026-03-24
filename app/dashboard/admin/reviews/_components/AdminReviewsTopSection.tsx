"use client";

import { AdminReviewsHeader } from "./AdminReviewsHeader";
import { AdminReviewsStats } from "./AdminReviewsStats";
import { AdminReviewsToolbar } from "./AdminReviewsToolbar";
import type { AdminReviewsContentProps } from "../_types/reviewContent";

export function AdminReviewsTopSection({
  tab,
  setTab,
  pendingCount,
  approvedCount,
  onRefresh,
  newPendingCount,
  stats,
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
}: Pick<
  AdminReviewsContentProps,
  | "tab"
  | "setTab"
  | "pendingCount"
  | "approvedCount"
  | "onRefresh"
  | "newPendingCount"
  | "stats"
  | "search"
  | "setSearch"
  | "ratingFilter"
  | "setRatingFilter"
  | "sortMode"
  | "setSortMode"
  | "totalFiltered"
  | "selectedCount"
  | "onSelectAllVisible"
  | "onClearSelection"
  | "onBulkApprove"
  | "onBulkMoveToPending"
  | "onBulkDelete"
  | "onExportCsv"
>) {
  return (
    <>
      <AdminReviewsHeader
        tab={tab}
        setTab={setTab}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        onRefresh={onRefresh}
        newPendingCount={newPendingCount}
      />

      <div data-testid="admin-reviews-stats">
        <AdminReviewsStats
          total={stats.total}
          pending={stats.pending}
          approved={stats.approved}
          averageRating={stats.averageRating}
        />
      </div>

      <AdminReviewsToolbar
        search={search}
        setSearch={setSearch}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        sortMode={sortMode}
        setSortMode={setSortMode}
        totalFiltered={totalFiltered}
        selectedCount={selectedCount}
        onSelectAllVisible={onSelectAllVisible}
        onClearSelection={onClearSelection}
        onBulkApprove={onBulkApprove}
        onBulkMoveToPending={onBulkMoveToPending}
        onBulkDelete={onBulkDelete}
        onExportCsv={onExportCsv}
        canBulkApprove={tab === "pending"}
        canBulkMoveToPending={tab === "approved"}
      />
    </>
  );
}