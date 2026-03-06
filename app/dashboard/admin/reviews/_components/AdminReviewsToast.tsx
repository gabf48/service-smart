"use client";

import type { Notice } from "../_types/reviews";

export function AdminReviewsToast({
  notice,
  onClose,
}: {
  notice: Notice;
  onClose: () => void;
}) {
  if (!notice) return null;

  const boxClass =
    notice.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/12 text-emerald-100"
      : "border-red-500/30 bg-red-500/12 text-red-100";

  return (
    <div className="fixed right-4 top-4 z-[70] w-full max-w-sm">
      <div className={`rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md ${boxClass}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold">
              {notice.type === "success" ? "OK" : "Eroare"}
            </div>
            <div className="mt-1 text-sm opacity-90">{notice.text}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Închide"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}