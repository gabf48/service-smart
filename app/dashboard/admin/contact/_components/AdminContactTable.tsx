"use client";

import type { ContactRequestRow } from "../_types/contact";
import { AdminContactRow } from "./AdminContactRow";

export function AdminContactTable({
  items,
  selectedIds,
  onToggleSelect,
  onOpenDetails,
}: {
  items: ContactRequestRow[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onOpenDetails: (item: ContactRequestRow) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
      <table className="w-full min-w-[1250px] text-sm">
        <thead className="bg-white/5">
          <tr className="text-white/80">
            <th className="p-4 text-left font-semibold">Select</th>
            <th className="p-4 text-left font-semibold">Nume</th>
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Motiv</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Descriere</th>
            <th className="p-4 text-left font-semibold">Creat la</th>
            <th className="p-4 text-left font-semibold">Acțiuni</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <AdminContactRow
              key={item.id}
              item={item}
              checked={selectedIds.includes(item.id)}
              onToggleSelect={onToggleSelect}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}