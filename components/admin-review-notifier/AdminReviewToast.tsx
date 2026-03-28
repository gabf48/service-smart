"use client";

import Link from "next/link";

export function AdminReviewToast({
  text,
  onClose,
}: {
  text: string | null;
  onClose: () => void;
}) {
  if (!text) return null;

  return (
    <div className="fixed right-4 top-20 z-[120] w-full max-w-sm">
      <div className="rounded-2xl border border-emerald-500/30 bg-gray-950/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-emerald-200">
              Notificare nouă
            </div>
            <div className="mt-1 text-sm text-white/85">{text}</div>

            <div className="mt-3">
              <Link
                href="/dashboard/admin/reviews"
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Vezi review-uri
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}