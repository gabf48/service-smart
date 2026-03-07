"use client";

import type { Notice } from "./types";
import { Stars } from "./Stars";

export function ReviewsHero({
  avg,
  count,
  onOpen,
  notice,
  onCloseNotice,
}: {
  avg: number;
  count: number;
  onOpen: () => void;
  notice: Notice;
  onCloseNotice: () => void;
}) {
  const bannerClass =
    notice?.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  return (
    <section className="relative overflow-hidden" data-testid="reviews-hero">
      <div className="absolute inset-0">
        <img
          src="/space.gif"
          alt="Space background"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-18">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight"
              data-testid="reviews-title"
            >
              Reviews
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80">
              Review-urile apar public după aprobarea adminului.
            </p>
          </div>

          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-xl"
            data-testid="reviews-summary-card"
          >
            <div className="text-sm text-white/70">Media review-urilor</div>

            <div className="mt-2 flex items-center gap-3">
              <div
                className="text-3xl font-bold tabular-nums"
                data-testid="reviews-average-rating"
              >
                {count ? avg.toFixed(1) : "0.0"}
              </div>

              <div data-testid="reviews-average-stars">
                <Stars value={Math.round(avg)} />
              </div>

              <div
                className="text-sm text-white/60"
                data-testid="reviews-count"
              >
                ({count})
              </div>
            </div>

            <button
              type="button"
              onClick={onOpen}
              data-testid="reviews-open-modal"
              className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-700 transition active:scale-[0.99]"
            >
              Adaugă review
            </button>
          </div>
        </div>

        {notice && (
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
                className="shrink-0 rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Închide"
                data-testid="reviews-page-notice-close"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}