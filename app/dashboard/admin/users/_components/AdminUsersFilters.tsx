"use client";

import type { RoleFilter } from "../_types/users";

export function AdminUsersFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}: {
  search: string;
  setSearch: (value: string) => void;
  roleFilter: RoleFilter;
  setRoleFilter: (value: RoleFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-white/25"
      />

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
        className="w-full md:w-60 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-white/25"
      >
        <option value="all">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="2fa-enabled">2FA Activat</option>
        <option value="2fa-disabled">2FA Nu</option>
      </select>
    </div>
  );
}