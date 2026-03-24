"use client";

import type { Notice } from "./types";

export function ReviewsHeroNotice({
  notice,
  onCloseNotice,
}: {
  notice: Notice;
  onCloseNotice: () => void;
}) {
  if (!notice) return null;

  const bannerClass =
    notice.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  return (
    <div
      className={`mt-6 rounded-xl border px-4 py-3 text-sm ${bannerClass}`}
      data-testid="reviews-page-notice"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className="font-semibold"
            data-testid="reviews-page-notice-title"
          >
            {notice.type === "success" ? "OK" : "Eroare"}
          </div>

          <div
            className="mt-1 opacity-90"
            data-testid="reviews-page-notice-text"
          >
            {notice.text}
          </div>
        </div>

        <button
          type="button"
          onClick={onCloseNotice}
          className="shrink-0 rounded-lg px-2 py-1 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Închide"
          data-testid="reviews-page-notice-close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}