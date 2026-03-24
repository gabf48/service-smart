"use client";

import type { PendingAction } from "../_types/users";

export function getAdminUsersModalConfig(
  pendingAction: PendingAction,
  currentUserId?: string
) {
  if (!pendingAction) {
    return { title: "", message: "", confirmLabel: "" };
  }

  if (pendingAction.type === "make-admin") {
    return {
      title: "Promovează utilizatorul",
      message: `Ești sigur că vrei să îl faci admin pe ${pendingAction.user.email}?`,
      confirmLabel: "Make admin",
    };
  }

  if (pendingAction.type === "make-user") {
    return {
      title: "Schimbă rolul în user",
      message:
        pendingAction.user.id === currentUserId
          ? "Ești sigur că vrei să îți elimini propriul rol de admin? Vei fi redirecționat către dashboard-ul de user."
          : `Ești sigur că vrei să îl faci user pe ${pendingAction.user.email}?`,
      confirmLabel: "Make user",
    };
  }

  if (pendingAction.type === "reset-password") {
    return {
      title: "Resetare parolă",
      message: `Va fi trimis un email de resetare a parolei către ${pendingAction.user.email}. Continui?`,
      confirmLabel: "Trimite email",
    };
  }

  return {
    title: pendingAction.user.is_active
      ? "Dezactivează utilizatorul"
      : "Activează utilizatorul",
    message: pendingAction.user.is_active
      ? `Ești sigur că vrei să dezactivezi utilizatorul ${pendingAction.user.email}?`
      : `Ești sigur că vrei să activezi utilizatorul ${pendingAction.user.email}?`,
    confirmLabel: pendingAction.user.is_active ? "Deactivate" : "Activate",
  };
}