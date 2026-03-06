"use client";

import React from "react";
import type { Notice } from "./types";

export function ReviewModalHeader({
  onClose,
  notice,
  onDismissNotice,
}: {
  onClose: () => void;
  notice: Notice;
  onDismissNotice?: () => void;
}) {
  const bannerClass =
    notice?.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  return (
    <div className="p-6 sm:p-7 border-b border-white/10 sticky top-0 bg-gray-950/85 backdrop-blur-md z-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-white/65">Review nou</div>
          <h3 className="mt-1 text-2xl font-bold">Lasă un review</h3>
          <p className="mt-2 text-sm text-white/75">Va fi publicat după aprobarea adminului.</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15 transition"
          aria-label="Închide"
        >
          ✕
        </button>
      </div>

      {notice && (
        <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${bannerClass}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{notice.type === "success" ? "OK" : "Eroare"}</div>
              <div className="mt-1 opacity-90">{notice.text}</div>
            </div>

            {onDismissNotice && (
              <button
                type="button"
                onClick={onDismissNotice}
                className="shrink-0 rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Închide mesajul"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}