"use client";

import React, { useMemo } from "react";

const LABELS: Record<number, string> = {
  1: "Foarte slab",
  2: "Slab",
  3: "OK",
  4: "Bun",
  5: "Excelent",
};

export function StarPicker({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const v = Math.max(1, Math.min(5, value || 1));
  const label = useMemo(() => LABELS[v] ?? "", [v]);

  return (
    <div
      className="flex flex-col gap-2"
      data-testid="review-star-picker"
      role="radiogroup"
      aria-label="Rating review"
    >
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const star = i + 1;
          const active = star <= v;

          return (
            <button
              key={star}
              id={`review-star-${star}`}
              type="button"
              disabled={disabled}
              onClick={() => onChange(star)}
              data-testid={`review-star-${star}`}
              aria-label={`${star} stele - ${LABELS[star]}`}
              aria-checked={v === star}
              role="radio"
              title={`${star} - ${LABELS[star]}`}
              className={[
                "text-2xl leading-none transition select-none",
                active ? "text-amber-300" : "text-white/25 hover:text-white/50",
                disabled ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              ★
            </button>
          );
        })}

        <span
          className="text-sm text-white/70 ml-2"
          data-testid="review-rating-value"
        >
          {v}/5 <span className="text-white/50">— {label}</span>
        </span>
      </div>

      <div
        className="text-xs text-white/60"
        data-testid="review-rating-legend"
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const star = i + 1;
          return (
            <span key={star} className="mr-3 whitespace-nowrap">
              ⭐ {star} – {LABELS[star]}
            </span>
          );
        })}
      </div>
    </div>
  );
}