"use client";

import type { Notice } from "../_utils/reviews";

export function AdminReviewsNotice({
  notice,
  onClose,
}: {
  notice: Notice;
  onClose: () => void;
}) {
  if (!notice) return null;

  const bannerClass =
    notice.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  return (
    <div className={`mt-6 rounded-2xl border px-5 py-4 ${bannerClass}`}>
      <div className="flex items-start justify-between gap-4">
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
  );
}