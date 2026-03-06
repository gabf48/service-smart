"use client";

import React from "react";

export function ReviewModalFooter({
  submitting,
  uploadPct,
  canSubmit,
  onClose,
  onSubmit,
}: {
  submitting: boolean;
  uploadPct: number;
  canSubmit: boolean;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <div className="border-t border-white/10 p-5 sm:p-6 sticky bottom-0 bg-gray-950/85 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="text-xs text-white/60">
          Dacă ești logat, numele este preluat automat.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {uploadPct > 0 && (
            <div className="w-full sm:w-56">
              <div className="text-xs text-white/60 mb-1">Upload: {uploadPct}%</div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${uploadPct}%` }} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition"
              disabled={submitting}
            >
              Anulează
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting || !canSubmit}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {submitting ? "Se trimite..." : "Trimite review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}