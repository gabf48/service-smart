"use client";

export function AdminReviewStars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < r ? "text-amber-300" : "text-white/20"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-white/70 tabular-nums">{r}/5</span>
    </div>
  );
}