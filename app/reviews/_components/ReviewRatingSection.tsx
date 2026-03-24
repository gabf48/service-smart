"use client";

import { StarPicker } from "./StarPicker";

export function ReviewRatingSection({
  rating,
  setRating,
  submitting,
}: {
  rating: number;
  setRating: (v: number) => void;
  submitting: boolean;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
      data-testid="review-rating-section"
    >
      <div className="text-sm font-semibold" data-testid="review-rating-label">
        Rating (obligatoriu)
      </div>

      <div className="mt-2" data-testid="review-rating-picker">
        <StarPicker value={rating} onChange={setRating} disabled={submitting} />
      </div>
    </div>
  );
}