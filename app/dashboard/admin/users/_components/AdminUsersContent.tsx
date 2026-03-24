"use client";

import type { UserRow, RoleFilter } from "../_types/users";
import { AdminUsersFilters } from "./AdminUsersFilters";
import { AdminUsersNotice } from "./AdminUsersNotice";
import { AdminUsersTable } from "./AdminUsersTable";

export function AdminUsersContent({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  notice,
  loading,
  errorMsg,
  users,
  currentUserId,
  onMakeAdmin,
  onMakeUser,
  onResetPassword,
  onToggleActive,
  busyAction,
}: {
  search: string;
  setSearch: (value: string) => void;
  roleFilter: RoleFilter;
  setRoleFilter: (value: RoleFilter) => void;
  notice: { type: "success" | "error"; text: string } | null;
  loading: boolean;
  errorMsg: string | null;
  users: UserRow[];
  currentUserId?: string;
  onMakeAdmin: (user: UserRow) => void;
  onMakeUser: (user: UserRow) => void;
  onResetPassword: (user: UserRow) => void;
  onToggleActive: (user: UserRow) => void;
  busyAction?: string | null;
}) {
  return (
    <>
      <AdminUsersFilters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      <AdminUsersNotice notice={notice} />

      {loading && <p className="text-white/70">Loading users...</p>}
      {errorMsg && <p className="text-red-400">{errorMsg}</p>}

      {!loading && !errorMsg && (
        <AdminUsersTable
          users={users}
          currentUserId={currentUserId}
          onMakeAdmin={onMakeAdmin}
          onMakeUser={onMakeUser}
          onResetPassword={onResetPassword}
          onToggleActive={onToggleActive}
          busyAction={busyAction}
        />
      )}
    </>
  );
}