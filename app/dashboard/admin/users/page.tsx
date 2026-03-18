"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AdminUsersHeader } from "./_components/AdminUsersHeader";
import { AdminUsersFilters } from "./_components/AdminUsersFilters";
import { AdminUsersTable } from "./_components/AdminUsersTable";
import { ConfirmActionModal } from "./_components/ConfirmActionModal";
import { AdminUsersNotice } from "./_components/AdminUsersNotice";
import { useAdminUsersPage } from "./_hooks/useAdminUsersPage";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();

  const {
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
  } = useAdminUsersPage(currentUser?.id);

  return (
    <div className="space-y-6 p-6" data-testid="admin-users-page">
      <AdminUsersHeader total={filteredUsers.length} onRefresh={loadUsers} />

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
  users={filteredUsers}
  currentUserId={currentUser?.id}
  onMakeAdmin={(user) => setPendingAction({ type: "make-admin", user })}
  onMakeUser={(user) => setPendingAction({ type: "make-user", user })}
  onResetPassword={(user) =>
    setPendingAction({ type: "reset-password", user })
  }
  onToggleActive={(user) =>
    setPendingAction({ type: "toggle-active", user })
  }
  busyAction={busyAction}
/>
      )}

     <ConfirmActionModal
  open={!!pendingAction}
  title={
    !pendingAction
      ? ""
      : pendingAction.type === "make-admin"
      ? "Promovează utilizatorul"
      : pendingAction.type === "make-user"
      ? "Schimbă rolul în user"
      : pendingAction.type === "reset-password"
      ? "Resetare parolă"
      : pendingAction.user.is_active
      ? "Dezactivează utilizatorul"
      : "Activează utilizatorul"
  }
  message={
    !pendingAction
      ? ""
      : pendingAction.type === "make-admin"
      ? `Ești sigur că vrei să îl faci admin pe ${pendingAction.user.email}?`
      : pendingAction.type === "make-user"
      ? pendingAction.user.id === currentUser?.id
        ? "Ești sigur că vrei să îți elimini propriul rol de admin? Vei fi redirecționat către dashboard-ul de user."
        : `Ești sigur că vrei să îl faci user pe ${pendingAction.user.email}?`
      : pendingAction.type === "reset-password"
      ? `Va fi trimis un email de resetare a parolei către ${pendingAction.user.email}. Continui?`
      : pendingAction.user.is_active
      ? `Ești sigur că vrei să dezactivezi utilizatorul ${pendingAction.user.email}?`
      : `Ești sigur că vrei să activezi utilizatorul ${pendingAction.user.email}?`
  }
  confirmLabel={
    !pendingAction
      ? ""
      : pendingAction.type === "make-admin"
      ? "Make admin"
      : pendingAction.type === "make-user"
      ? "Make user"
      : pendingAction.type === "reset-password"
      ? "Trimite email"
      : pendingAction.user.is_active
      ? "Deactivate"
      : "Activate"
  }
  onCancel={() => setPendingAction(null)}
  onConfirm={handleConfirmAction}
/>
    </div>
  );
}