"use client";

import type {
  ContactReasonFilter,
  ContactStatusFilter,
} from "../_types/contact";

export function AdminContactFilters({
  search,
  setSearch,
  reasonFilter,
  setReasonFilter,
  statusFilter,
  setStatusFilter,
}: {
  search: string;
  setSearch: (value: string) => void;
  reasonFilter: ContactReasonFilter;
  setReasonFilter: (value: ContactReasonFilter) => void;
  statusFilter: ContactStatusFilter;
  setStatusFilter: (value: ContactStatusFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <input
        placeholder="Caută după nume, email, descriere..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
      />

      <select
        value={reasonFilter}
        onChange={(e) =>
          setReasonFilter(e.target.value as ContactReasonFilter)
        }
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
      >
        <option value="all">Toate motivele</option>
        <option value="Cerere oferta">Cerere ofertă</option>
        <option value="Bug website">Bug website</option>
        <option value="Colaborare">Colaborare</option>
        <option value="Problema laptop/PC">Problemă laptop/PC</option>
        <option value="Alt motiv">Alt motiv</option>
        <option value="Modifica date personale">Modifică date personale</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value as ContactStatusFilter)
        }
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
      >
        <option value="all">Toate statusurile</option>
        <option value="open">Deschise</option>
        <option value="resolved">Rezolvate</option>
      </select>
    </div>
  );
}