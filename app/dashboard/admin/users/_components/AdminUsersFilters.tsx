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
    <div className="flex flex-col gap-3 md:flex-row">
      <input
        placeholder="Search email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
      />

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
      >
        <option value="all">All roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  );
}