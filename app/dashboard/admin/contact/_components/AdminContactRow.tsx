"use client";

import type { ContactRequestRow } from "../_types/contact";
import { AdminContactStatusBadge } from "./AdminContactStatusBadge";

export function AdminContactRow({
  item,
  checked,
  onToggleSelect,
  onOpenDetails,
}: {
  item: ContactRequestRow;
  checked: boolean;
  onToggleSelect: (id: string) => void;
  onOpenDetails: (item: ContactRequestRow) => void;
}) {
  return (
    <tr className="border-t border-white/10 align-top">
      <td className="p-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggleSelect(item.id)}
          className="h-4 w-4 rounded border-white/20 bg-white/5"
        />
      </td>

      <td className="p-4 text-white">{item.name}</td>
      <td className="p-4 text-white/90">{item.email}</td>
      <td className="p-4 text-white/80">{item.reason}</td>
      <td className="p-4">
        <AdminContactStatusBadge status={item.status} />
      </td>
      <td className="p-4 text-white/70">
        <div className="max-w-[320px] truncate">{item.description}</div>
      </td>
      <td className="p-4 text-white/60">
        {item.created_at ? new Date(item.created_at).toLocaleString("ro-RO") : "-"}
      </td>
      <td className="p-4">
        <button
          type="button"
          onClick={() => onOpenDetails(item)}
          className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
        >
          Vezi detalii
        </button>
      </td>
    </tr>
  );
}