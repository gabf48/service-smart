"use client";

import type { ContactRequestRow } from "../_types/contact";
import { AdminContactMetaGrid } from "./AdminContactMetaGrid";
import { AdminContactAttachments } from "./AdminContactAttachments";
import { AdminContactModalActions } from "./AdminContactModalActions";

export function AdminContactDetailsModal({
  item,
  busy,
  onClose,
  onToggleResolved,
}: {
  item: ContactRequestRow | null;
  busy: boolean;
  onClose: () => void;
  onToggleResolved: (item: ContactRequestRow) => void;
}) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-gray-950/95 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Detalii mesaj de contact
            </h3>
            <p className="mt-1 text-sm text-white/50">
              {item.created_at
                ? new Date(item.created_at).toLocaleString("ro-RO")
                : "-"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/80 transition hover:bg-white/15"
          >
            Închide
          </button>
        </div>

        <AdminContactMetaGrid item={item} />

        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-wide text-white/40">
            Descriere
          </div>
          <div className="mt-2 whitespace-pre-wrap text-sm text-white">
            {item.description || "-"}
          </div>
        </div>

        <AdminContactAttachments attachments={item.attachments} />

        <AdminContactModalActions
          item={item}
          busy={busy}
          onToggleResolved={onToggleResolved}
        />
      </div>
    </div>
  );
}