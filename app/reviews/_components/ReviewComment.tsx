// app/reviews/_components/ReviewComment.tsx
"use client";

import React from "react";

function Chevron({ up }: { up?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-70"
      aria-hidden="true"
    >
      <path
        d={up ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReviewComment({
  text,
  collapsedMaxH = 120,
}: {
  text: string;
  collapsedMaxH?: number;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [isLong, setIsLong] = React.useState(false);
  const [measuredH, setMeasuredH] = React.useState<number>(collapsedMaxH);

  const pRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useLayoutEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const measure = () => {
      const full = el.scrollHeight;
      setIsLong(full > collapsedMaxH + 8);
      setMeasuredH(full);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text, collapsedMaxH]);

  const maxH = expanded ? measuredH : collapsedMaxH;

  return (
    <div className="mt-4">
      <div className="relative">
        <p
          ref={pRef}
          className="text-sm text-white/80 whitespace-pre-line"
          style={{
            maxHeight: `${maxH}px`,
            overflow: "hidden",
            transition: "max-height 260ms ease",
          }}
        >
          {text ?? ""}
        </p>

        {!expanded && isLong && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        )}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/15 transition"
        >
          {expanded ? "Ascunde" : "Citește tot"}
          <Chevron up={expanded} />
        </button>
      )}
    </div>
  );
}