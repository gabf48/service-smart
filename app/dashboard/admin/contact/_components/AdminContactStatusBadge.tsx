"use client";

import type { ContactRequestStatus } from "../_types/contact";

export function AdminContactStatusBadge({
  status,
}: {
  status: ContactRequestStatus;
}) {
  const isResolved = status === "resolved";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isResolved
          ? "bg-green-500/20 text-green-300"
          : "bg-amber-500/20 text-amber-300"
      }`}
    >
      {isResolved ? "Rezolvat" : "Deschis"}
    </span>
  );
}