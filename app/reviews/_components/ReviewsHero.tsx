"use client";

import type { Notice } from "./types";
import { ReviewsHeroSummary } from "./ReviewsHeroSummary";
import { ReviewsHeroNotice } from "./ReviewsHeroNotice";

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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1
              className="text-4xl font-bold leading-tight sm:text-5xl"
              data-testid="reviews-title"
            >
              Reviews
            </h1>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              Review-urile apar public după aprobarea adminului.
            </p>
          </div>

          <ReviewsHeroSummary avg={avg} count={count} onOpen={onOpen} />
        </div>

        <ReviewsHeroNotice notice={notice} onCloseNotice={onCloseNotice} />
      </div>
    </section>
  );
}