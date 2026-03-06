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
    <div className="flex flex-wrap gap-3 items-center">
      <span className="text-sm text-white/60">
        Selectate: <span className="text-white font-semibold">{selectedCount}</span>
      </span>

      <button
        type="button"
        onClick={onSelectAllVisible}
        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
      >
        Selectează pagina
      </button>

      <button
        type="button"
        onClick={onClearSelection}
        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
      >
        Clear
      </button>

      {canBulkApprove && (
        <button
          type="button"
          onClick={onBulkApprove}
          disabled={!selectedCount}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-40"
        >
          Approve selected
        </button>
      )}

      {canBulkMoveToPending && (
        <button
          type="button"
          onClick={onBulkMoveToPending}
          disabled={!selectedCount}
          className="rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition disabled:opacity-40"
        >
          Move selected to pending
        </button>
      )}

      <button
        type="button"
        onClick={onBulkDelete}
        disabled={!selectedCount}
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700 transition disabled:opacity-40"
      >
        Delete selected
      </button>
    </div>
  );
}