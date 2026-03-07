"use client";

import { AdminReviewsHeader } from "./_components/AdminReviewsHeader";
import { AdminReviewsStats } from "./_components/AdminReviewsStats";
import { AdminReviewsList } from "./_components/AdminReviewsList";
import { ConfirmDeleteModal } from "./_components/ConfirmDeleteModal";
import { AdminReviewsToast } from "./_components/AdminReviewsToast";
import { AdminReviewsToolbar } from "./_components/AdminReviewsToolbar";
import { AdminReviewsPagination } from "./_components/AdminReviewsPagination";
import { useAdminReviews } from "./_hooks/useAdminReviews";

export default function AdminReviewsPage() {
  const {
    loading,
    busyId,
    confirmDeleteId,
    setConfirmDeleteId,
    notice,
    setNotice,

    tab,
    setTab,
    pending,
    approved,
    list,
    fetchReviews,
    setApproved,
    deleteReview,
    newPendingCount,

    search,
    setSearch,
    ratingFilter,
    setRatingFilter,
    sortMode,
    setSortMode,
    page,
    setPage,
    totalPages,
    totalFiltered,

    selectedIds,
    toggleSelected,
    selectAllVisible,
    clearSelection,
    bulkApprove,
    bulkMoveToPending,
    bulkDelete,
    exportCsv,

    stats,
  } = useAdminReviews();

  return (
    <div
      className="space-bg h-dvh overflow-hidden flex items-center justify-center p-6"
      data-testid="admin-reviews-page"
    >
      <div
        className="mx-auto max-w-6xl px-4 py-10 w-full"
        data-testid="admin-reviews-container"
      >
        <AdminReviewsHeader
          tab={tab}
          setTab={setTab}
          pendingCount={pending.length}
          approvedCount={approved.length}
          onRefresh={fetchReviews}
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
          selectedCount={selectedIds.length}
          onSelectAllVisible={selectAllVisible}
          onClearSelection={clearSelection}
          onBulkApprove={async () => {
            await bulkApprove(selectedIds);
            clearSelection();
          }}
          onBulkMoveToPending={async () => {
            await bulkMoveToPending(selectedIds);
            clearSelection();
          }}
          onBulkDelete={async () => {
            await bulkDelete(selectedIds);
            clearSelection();
          }}
          onExportCsv={exportCsv}
          canBulkApprove={tab === "pending"}
          canBulkMoveToPending={tab === "approved"}
        />

        <div className="mt-8" data-testid="admin-reviews-list-section">
          <AdminReviewsList
            loading={loading}
            reviews={list}
            tab={tab}
            busyId={busyId}
            selectedIds={selectedIds}
            onToggleSelected={toggleSelected}
            onApprove={(id) => setApproved(id, true)}
            onMoveToPending={(id) => setApproved(id, false)}
            onReject={(id) => setConfirmDeleteId(id)}
          />
        </div>

       <AdminReviewsPagination
  page={page}
  setPage={setPage}
  totalPages={totalPages}
/>
      </div>

      <ConfirmDeleteModal
        open={!!confirmDeleteId}
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={async () => {
          if (!confirmDeleteId) return;
          await deleteReview(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
      />

      <AdminReviewsToast
        notice={notice}
        onClose={() => setNotice(null)}
      />
    </div>
  );
}