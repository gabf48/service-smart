"use client";

import type { ContactRequestRow } from "../_types/contact";

export function AdminContactModalActions({
  item,
  busy,
  onToggleResolved,
}: {
  item: ContactRequestRow;
  busy: boolean;
  onToggleResolved: (item: ContactRequestRow) => void;
}) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={() => onToggleResolved(item)}
        disabled={busy}
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
          item.status === "resolved"
            ? "bg-amber-600 hover:bg-amber-700"
            : "bg-green-600 hover:bg-green-700"
        } disabled:opacity-50`}
      >
        {busy
          ? "Se salvează..."
          : item.status === "resolved"
          ? "Redeschide"
          : "Marchează ca rezolvat"}
      </button>
    </div>
  );
}