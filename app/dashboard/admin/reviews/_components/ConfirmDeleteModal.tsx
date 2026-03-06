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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-950/95 p-6 shadow-2xl">
        <h3 className="text-lg font-semibold">Ștergere review</h3>

        <p className="mt-2 text-sm text-white/70">
          Ești sigur că vrei să respingi și să ștergi acest review?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
          >
            Anulează
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700 transition"
          >
            Șterge review
          </button>
        </div>
      </div>
    </div>
  );
}