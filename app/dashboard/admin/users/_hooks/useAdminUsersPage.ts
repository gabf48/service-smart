"use client";

import { useState } from "react";
import type { PendingAction } from "../_types/users";
import { useAutoDismissNotice } from "./useAutoDismissNotice";
import { useAdminUsersActions } from "./useAdminUsersActions";
import { useAdminUsersData } from "./useAdminUsersData";
import { useAdminUsersFilters } from "./useAdminUsersFilters";

type Notice = { type: "success" | "error"; text: string } | null;

export function useAdminUsersPage(currentUserId?: string) {
  const [notice, setNotice] = useState<Notice>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  useAutoDismissNotice(notice, () => setNotice(null));

  const data = useAdminUsersData();
  const filters = useAdminUsersFilters(data.users);

  const actions = useAdminUsersActions({
    currentUserId,
    setUsers: data.setUsers,
    loadUsers: data.loadUsers,
    setNotice,
  });

  return {
    filteredUsers: filters.filteredUsers,
    loading: data.loading,
    errorMsg: data.errorMsg,
    notice,
    search: filters.search,
    setSearch: filters.setSearch,
    roleFilter: filters.roleFilter,
    setRoleFilter: filters.setRoleFilter,
    pendingAction,
    setPendingAction,
    busyAction: actions.busyAction,
    loadUsers: data.loadUsers,
    handleConfirmAction: () =>
      actions.handleConfirmAction(pendingAction, () => setPendingAction(null)),
  };
}