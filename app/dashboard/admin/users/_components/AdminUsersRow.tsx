"use client";

import type { UserRow } from "../_types/users";
import { AdminUsersRoleBadge } from "./AdminUsersRoleBadge";
import { AdminUsersStatusBadge } from "./AdminUsersStatusBadge";
import { AdminUsersActionButtons } from "./AdminUsersActionButtons";

export function AdminUsersRow({
  user,
  currentUserId,
  onMakeAdmin,
  onMakeUser,
  onResetPassword,
  onToggleActive,
  busyAction,
}: {
  user: UserRow;
  currentUserId?: string;
  onMakeAdmin: (user: UserRow) => void;
  onMakeUser: (user: UserRow) => void;
  onResetPassword: (user: UserRow) => void;
  onToggleActive: (user: UserRow) => void;
  busyAction?: string | null;
}) {
  return (
    <tr className="border-t border-white/10 align-top">
      <td className="p-4 text-white">{user.email}</td>

      <td className="p-4">
        <AdminUsersRoleBadge role={user.role} />
      </td>

      <td className="p-4">
        <AdminUsersStatusBadge isActive={user.is_active} />
      </td>

      <td className="p-4">
        <AdminUsersActionButtons
          user={user}
          currentUserId={currentUserId}
          onMakeAdmin={onMakeAdmin}
          onMakeUser={onMakeUser}
          onResetPassword={onResetPassword}
          onToggleActive={onToggleActive}
          busyAction={busyAction}
        />
      </td>

      <td className="p-4 text-xs text-white/55">{user.id}</td>
    </tr>
  );
}