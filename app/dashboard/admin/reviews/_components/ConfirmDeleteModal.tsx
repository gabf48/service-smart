"use client";

export function ConfirmDeleteModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      data-testid="confirm-delete-modal"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-950/95 p-6 shadow-2xl"
        data-testid="confirm-delete-container"
      >
        <h3
          id="confirm-delete-title"
          className="text-lg font-semibold"
          data-testid="confirm-delete-title"
        >
          Ștergere review
        </h3>

        <p
          className="mt-2 text-sm text-white/70"
          data-testid="confirm-delete-text"
        >
          Ești sigur că vrei să respingi și să ștergi acest review?
        </p>

        <div
          className="mt-6 flex justify-end gap-3"
          data-testid="confirm-delete-actions"
        >
          <button
            onClick={onCancel}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
            data-testid="confirm-delete-cancel"
          >
            Anulează
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700 transition"
            data-testid="confirm-delete-confirm"
          >
            Șterge review
          </button>
        </div>
      </div>
    </div>
  );
}