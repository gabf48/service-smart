"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { PendingAction, RoleFilter, UserRow } from "../_types/users";
import { useAutoDismissNotice } from "./useAutoDismissNotice";
import {
  fetchUsers,
  updateUserRole,
  updateUserActiveStatus,
  sendResetPasswordEmail,
} from "../_utils/adminUsersApi";

export function useAdminUsersPage(currentUserId?: string) {
  const router = useRouter();

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [notice, setNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  useAutoDismissNotice(notice, () => setNotice(null));

  const loadUsers = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await fetchUsers();

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !search || user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" ? true : user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const changeRole = async (id: string, newRole: "admin" | "user") => {
    setBusyAction(`${newRole === "admin" ? "make-admin" : "make-user"}:${id}`);

    const { error } = await updateUserRole(id, newRole);

    if (error) {
      setBusyAction(null);
      setNotice({
        type: "error",
        text: "Nu s-a putut modifica rolul.",
      });
      return;
    }

    setNotice({
      type: "success",
      text: "Rolul a fost actualizat.",
    });

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );

    if (currentUserId === id && newRole !== "admin") {
      setBusyAction(null);
      router.replace("/dashboard/user");
      return;
    }

    await loadUsers();
    setBusyAction(null);
  };

  const resetPassword = async (user: UserRow) => {
    setBusyAction(`reset:${user.id}`);
    setNotice(null);

    const { ok, error } = await sendResetPasswordEmail(user);

    if (!ok) {
      setBusyAction(null);
      setNotice({
        type: "error",
        text: error || "Eroare la trimitere email.",
      });
      return;
    }

    setBusyAction(null);
    setNotice({
      type: "success",
      text: "Emailul de resetare a fost trimis.",
    });
  };

const toggleActive = async (user: UserRow) => {
  setBusyAction(`toggle-active:${user.id}`);

  const { error } = await updateUserActiveStatus(user.id, !user.is_active);

  if (error) {
    setBusyAction(null);
    setNotice({
      type: "error",
      text: "Nu s-a putut actualiza statusul utilizatorului.",
    });
    return;
  }

  setNotice({
    type: "success",
    text: user.is_active
      ? "Utilizatorul a fost dezactivat."
      : "Utilizatorul a fost activat.",
  });

  setUsers((prev) =>
    prev.map((u) =>
      u.id === user.id ? { ...u, is_active: !u.is_active } : u
    )
  );

  await loadUsers();
  setBusyAction(null);
};


  const handleConfirmAction = async () => {
  if (!pendingAction) return;

  if (pendingAction.type === "make-admin") {
    await changeRole(pendingAction.user.id, "admin");
  }

  if (pendingAction.type === "make-user") {
    await changeRole(pendingAction.user.id, "user");
  }

  if (pendingAction.type === "reset-password") {
    await resetPassword(pendingAction.user);
  }

  if (pendingAction.type === "toggle-active") {
    await toggleActive(pendingAction.user);
  }

  setPendingAction(null);
};

  return {
    filteredUsers,
    loading,
    errorMsg,
    notice,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    pendingAction,
    setPendingAction,
    busyAction,
    loadUsers,
    handleConfirmAction,
  };
}