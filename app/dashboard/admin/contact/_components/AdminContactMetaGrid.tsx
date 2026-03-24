"use client";

import type { ContactRequestRow } from "../_types/contact";
import { AdminContactStatusBadge } from "./AdminContactStatusBadge";
import { AdminContactEmailCard } from "./AdminContactEmailCard";

export function AdminContactMetaGrid({
  item,
}: {
  item: ContactRequestRow;
}) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-wide text-white/40">
          Nume
        </div>
        <div className="mt-2 text-sm text-white">{item.name || "-"}</div>
      </div>

      <AdminContactEmailCard email={item.email || "-"} />

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-wide text-white/40">
          Telefon
        </div>
        <div className="mt-2 text-sm text-white">{item.phone || "-"}</div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-wide text-white/40">
          Motiv
        </div>
        <div className="mt-2 text-sm text-white">{item.reason || "-"}</div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:col-span-2">
        <div className="text-xs uppercase tracking-wide text-white/40">
          Status
        </div>
        <div className="mt-2">
          <AdminContactStatusBadge status={item.status} />
        </div>
      </div>
    </div>
  );
}