"use client";

export function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="inline-flex items-center gap-1" aria-label={`${v} din 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < v;
        return (
          <span
            key={i}
            className={[
              "text-lg leading-none",
              filled ? "text-amber-300" : "text-white/25",
            ].join(" ")}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}