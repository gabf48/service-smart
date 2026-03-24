"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PendingAction, UserRow } from "../_types/users";
import {
  changeUserRole,
  resetUserPassword,
  toggleUserActiveState,
} from "../_utils/adminUsersActionHelpers";

type Notice = { type: "success" | "error"; text: string } | null;

export function useAdminUsersActions({
  currentUserId,
  setUsers,
  loadUsers,
  setNotice,
}: {
  currentUserId?: string;
  setUsers: React.Dispatch<React.SetStateAction<UserRow[]>>;
  loadUsers: () => Promise<void>;
  setNotice: React.Dispatch<React.SetStateAction<Notice>>;
}) {
  const router = useRouter();
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const handleConfirmAction = async (
    pendingAction: PendingAction,
    clearPending: () => void
  ) => {
    if (!pendingAction) return;

    if (pendingAction.type === "make-admin") {
      await changeUserRole({
        id: pendingAction.user.id,
        newRole: "admin",
        currentUserId,
        setBusyAction,
        setNotice,
        setUsers,
        loadUsers,
        onSelfDowngrade: () => router.replace("/dashboard/user"),
      });
    }

    if (pendingAction.type === "make-user") {
      await changeUserRole({
        id: pendingAction.user.id,
        newRole: "user",
        currentUserId,
        setBusyAction,
        setNotice,
        setUsers,
        loadUsers,
        onSelfDowngrade: () => router.replace("/dashboard/user"),
      });
    }

    if (pendingAction.type === "reset-password") {
      await resetUserPassword({
        user: pendingAction.user,
        setBusyAction,
        setNotice,
      });
    }

    if (pendingAction.type === "toggle-active") {
      await toggleUserActiveState({
        user: pendingAction.user,
        setBusyAction,
        setNotice,
        setUsers,
        loadUsers,
      });
    }

    clearPending();
  };

  return {
    busyAction,
    handleConfirmAction,
  };
}