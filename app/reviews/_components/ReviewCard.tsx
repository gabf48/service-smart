"use client";

import { Stars } from "./Stars";
import { ReviewComment } from "./ReviewComment";

function fmtDateTime(iso: string) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ro-RO", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
}

export function ReviewCard({ r }: { r: any }) {
  const isTop = (r.rating || 0) === 5;

  return (
    <div
      className={[
        "rounded-2xl border p-6 shadow-xl shadow-black/30 backdrop-blur-md",
        isTop
          ? "border-amber-400/40 bg-amber-400/5"
          : "border-white/10 bg-white/5",
      ].join(" ")}
    >
      {isTop && (
        <div className="mb-3 inline-flex items-center rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
          Recomandat ★★★★★
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold leading-snug">
            {r.display_name}
          </div>
          <div className="mt-1 text-xs text-white/60">
            {fmtDateTime(r.created_at)}
          </div>
        </div>
        <Stars value={r.rating || 0} />
      </div>

      <ReviewComment text={r.comment || ""} />

      {Array.isArray(r.attachments) && r.attachments.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {r.attachments.slice(0, 3).map((u: string) => (
            <a
              key={u}
              href={u}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-xl border border-white/10 bg-black/30"
              title="Deschide imaginea"
            >
              <img
                src={u}
                alt="attachment"
                loading="lazy"
                decoding="async"
                className="h-24 w-full object-cover opacity-90 transition group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}