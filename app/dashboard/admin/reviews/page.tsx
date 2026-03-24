"use client";

import { ConfirmDeleteModal } from "./_components/ConfirmDeleteModal";
import { AdminReviewsToast } from "./_components/AdminReviewsToast";
import { AdminReviewsContent } from "./_components/AdminReviewsContent";
import { useAdminReviews } from "./_hooks/useAdminReviews";
import { useAdminReviewsPageActions } from "./_hooks/useAdminReviewsPageActions";

export default function AdminReviewsPage() {
  const reviews = useAdminReviews();

  const actions = useAdminReviewsPageActions({
    selectedIds: reviews.selectedIds,
    bulkApprove: reviews.bulkApprove,
    bulkMoveToPending: reviews.bulkMoveToPending,
    bulkDelete: reviews.bulkDelete,
    clearSelection: reviews.clearSelection,
    setApproved: reviews.setApproved,
    setConfirmDeleteId: reviews.setConfirmDeleteId,
    confirmDeleteId: reviews.confirmDeleteId,
    deleteReview: reviews.deleteReview,
  });

  return (
    <div
      className="space-bg min-h-dvh overflow-x-hidden px-6 py-6 pb-28"
      data-testid="admin-reviews-page"
    >
      <AdminReviewsContent
        loading={reviews.loading}
        busyId={reviews.busyId}
        tab={reviews.tab}
        setTab={reviews.setTab}
        pendingCount={reviews.pending.length}
        approvedCount={reviews.approved.length}
        onRefresh={reviews.fetchReviews}
        newPendingCount={reviews.newPendingCount}
        stats={reviews.stats}
        search={reviews.search}
        setSearch={reviews.setSearch}
        ratingFilter={reviews.ratingFilter}
        setRatingFilter={reviews.setRatingFilter}
        sortMode={reviews.sortMode}
        setSortMode={reviews.setSortMode}
        totalFiltered={reviews.totalFiltered}
        selectedCount={reviews.selectedIds.length}
        onSelectAllVisible={reviews.selectAllVisible}
        onClearSelection={reviews.clearSelection}
        onBulkApprove={actions.handleBulkApprove}
        onBulkMoveToPending={actions.handleBulkMoveToPending}
        onBulkDelete={actions.handleBulkDelete}
        onExportCsv={reviews.exportCsv}
        selectedIds={reviews.selectedIds}
        reviews={reviews.list}
        onToggleSelected={reviews.toggleSelected}
        onApprove={actions.handleApprove}
        onMoveToPending={actions.handleMoveToPending}
        onReject={actions.handleReject}
        page={reviews.page}
        setPage={reviews.setPage}
        totalPages={reviews.totalPages}
      />

      <ConfirmDeleteModal
        open={!!reviews.confirmDeleteId}
        onCancel={() => reviews.setConfirmDeleteId(null)}
        onConfirm={actions.handleConfirmDelete}
      />

      <AdminReviewsToast
        notice={reviews.notice}
        onClose={() => reviews.setNotice(null)}
      />
    </div>
  );
}