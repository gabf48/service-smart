"use client";

import React, { useMemo } from "react";
import type { ReviewRow } from "../_hooks/useReviews";
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

export function ReviewsList({
  reviews,
  loading,
  onRefresh,
}: {
  reviews: ReviewRow[];
  loading: boolean;
  onRefresh: () => void;
}) {
  // sort: 5★ primele (rating desc), apoi cele mai noi (created_at desc)
  const sorted = useMemo(() => {
    const arr = [...(reviews || [])];
    arr.sort((a, b) => {
      const ra = a.rating ?? 0;
      const rb = b.rating ?? 0;
      if (rb !== ra) return rb - ra;

      const ta = a.created_at ? Date.parse(a.created_at) : 0;
      const tb = b.created_at ? Date.parse(b.created_at) : 0;
      return tb - ta;
    });
    return arr;
  }, [reviews]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-2xl sm:text-3xl font-bold">Ce spun clienții</h2>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="mt-6 text-white/70">Se încarcă review-urile…</div>
      ) : sorted.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/75">
          Încă nu există review-uri aprobate.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((r) => {
            const isTop = (r.rating || 0) === 5;

            return (
              <div
                key={r.id}
                className={[
                  "rounded-2xl border backdrop-blur-md p-6 shadow-xl shadow-black/30",
                  isTop ? "border-amber-400/40 bg-amber-400/5" : "border-white/10 bg-white/5",
                ].join(" ")}
              >
                {isTop && (
                  <div className="mb-3 inline-flex items-center rounded-lg bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200 border border-amber-400/20">
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
                    {r.attachments.slice(0, 3).map((u) => (
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
                          className="h-24 w-full object-cover opacity-90 group-hover:opacity-100 transition"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}