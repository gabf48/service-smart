"use client";

import type { UserRow } from "../_types/users";

export function AdminUsersActionsMenu({
  user,
  isSelf,
  isBusy,
  isResetBusy,
  isMakeAdminBusy,
  isMakeUserBusy,
  isToggleBusy,
  onMakeAdmin,
  onMakeUser,
  onResetPassword,
  onToggleActive,
}: {
  user: UserRow;
  isSelf: boolean;
  isBusy: boolean;
  isResetBusy: boolean;
  isMakeAdminBusy: boolean;
  isMakeUserBusy: boolean;
  isToggleBusy: boolean;
  onMakeAdmin: () => void;
  onMakeUser: () => void;
  onResetPassword: () => void;
  onToggleActive: () => void;
}) {
  return (
    <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-gray-950/95 shadow-2xl backdrop-blur-md">
      <button
        type="button"
        disabled={user.role === "admin" || isBusy}
        onClick={onMakeAdmin}
        className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
          user.role === "admin" || isBusy
            ? "cursor-not-allowed text-white/30"
            : "text-white hover:bg-white/10"
        }`}
      >
        {isMakeAdminBusy ? "Saving..." : "Make admin"}
      </button>

      <button
        type="button"
        disabled={user.role === "user" || isBusy}
        onClick={onMakeUser}
        className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
          user.role === "user" || isBusy
            ? "cursor-not-allowed text-white/30"
            : "text-white hover:bg-white/10"
        }`}
      >
        {isMakeUserBusy ? "Saving..." : isSelf ? "Remove admin" : "Make user"}
      </button>

      <button
        type="button"
        disabled={isBusy}
        onClick={onResetPassword}
        className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
          isBusy
            ? "cursor-not-allowed text-white/30"
            : "text-amber-300 hover:bg-white/10"
        }`}
      >
        {isResetBusy ? "Sending..." : "Reset password"}
      </button>

      <button
        type="button"
        disabled={isBusy || isSelf}
        onClick={onToggleActive}
        className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
          isBusy || isSelf
            ? "cursor-not-allowed text-white/30"
            : user.is_active
            ? "text-red-300 hover:bg-white/10"
            : "text-green-300 hover:bg-white/10"
        }`}
      >
        {isToggleBusy
          ? "Saving..."
          : user.is_active
          ? "Deactivate user"
          : "Activate user"}
      </button>
    </div>
  );
}