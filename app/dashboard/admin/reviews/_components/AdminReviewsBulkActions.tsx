"use client";

export function AdminReviewsBulkActions({
  selectedCount,
  onSelectAllVisible,
  onClearSelection,
  onBulkApprove,
  onBulkMoveToPending,
  onBulkDelete,
  canBulkApprove,
  canBulkMoveToPending,
}: {
  selectedCount: number;
  onSelectAllVisible: () => void;
  onClearSelection: () => void;
  onBulkApprove: () => void;
  onBulkMoveToPending: () => void;
  onBulkDelete: () => void;
  canBulkApprove: boolean;
  canBulkMoveToPending: boolean;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-3"
      data-testid="admin-reviews-bulk-actions"
    >
      <span className="text-sm text-white/60">
        Selectate: {selectedCount}
      </span>

      <button
        type="button"
        onClick={onSelectAllVisible}
        data-testid="admin-reviews-select-page"
        className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
      >
        Selectează pagina
      </button>

      <button
        type="button"
        onClick={onClearSelection}
        data-testid="admin-reviews-clear-selection"
        className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
      >
        Clear
      </button>

      {canBulkApprove && (
        <button
          type="button"
          onClick={onBulkApprove}
          data-testid="admin-reviews-bulk-approve"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
        >
          Approve selected
        </button>
      )}

      {canBulkMoveToPending && (
        <button
          type="button"
          onClick={onBulkMoveToPending}
          data-testid="admin-reviews-bulk-pending"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
        >
          Move selected to pending
        </button>
      )}

      <button
        type="button"
        onClick={onBulkDelete}
        data-testid="admin-reviews-bulk-delete"
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700"
      >
        Delete selected
      </button>
    </div>
  );
}