"use client";

export function useAdminReviewsPageActions({
  selectedIds,
  bulkApprove,
  bulkMoveToPending,
  bulkDelete,
  clearSelection,
  setApproved,
  setConfirmDeleteId,
  confirmDeleteId,
  deleteReview,
}: {
  selectedIds: string[];
  bulkApprove: (ids: string[]) => Promise<boolean>;
  bulkMoveToPending: (ids: string[]) => Promise<boolean>;
  bulkDelete: (ids: string[]) => Promise<boolean>;
  clearSelection: () => void;
  setApproved: (id: string, value: boolean) => Promise<boolean>;
  setConfirmDeleteId: (id: string | null) => void;
  confirmDeleteId: string | null;
  deleteReview: (id: string) => Promise<boolean>;
}) {
  const handleBulkApprove = async () => {
    await bulkApprove(selectedIds);
    clearSelection();
  };

  const handleBulkMoveToPending = async () => {
    await bulkMoveToPending(selectedIds);
    clearSelection();
  };

  const handleBulkDelete = async () => {
    await bulkDelete(selectedIds);
    clearSelection();
  };

  const handleApprove = (id: string) => setApproved(id, true);
  const handleMoveToPending = (id: string) => setApproved(id, false);
  const handleReject = (id: string) => setConfirmDeleteId(id);

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;
    await deleteReview(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  return {
    handleBulkApprove,
    handleBulkMoveToPending,
    handleBulkDelete,
    handleApprove,
    handleMoveToPending,
    handleReject,
    handleConfirmDelete,
  };
}