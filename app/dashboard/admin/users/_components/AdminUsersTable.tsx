"use client";

import type { UserRow } from "../_types/users";
import { AdminUsersRow } from "./AdminUsersRow";

export function AdminUsersTable({
  users,
  currentUserId,
  onMakeAdmin,
  onMakeUser,
  onResetPassword,
  onToggleActive,
  busyAction,
}: {
  users: UserRow[];
  currentUserId?: string;
  onMakeAdmin: (user: UserRow) => void;
  onMakeUser: (user: UserRow) => void;
  onResetPassword: (user: UserRow) => void;
  onToggleActive: (user: UserRow) => void;
  busyAction?: string | null;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="bg-white/5">
          <tr className="text-white/80">
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Role</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Actions</th>
            <th className="p-4 text-left font-semibold">User ID</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <AdminUsersRow
              key={user.id}
              user={user}
              currentUserId={currentUserId}
              onMakeAdmin={onMakeAdmin}
              onMakeUser={onMakeUser}
              onResetPassword={onResetPassword}
              onToggleActive={onToggleActive}
              busyAction={busyAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}