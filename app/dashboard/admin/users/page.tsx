"use client";

import { useAuth } from "@/app/context/useAuth";
import { AdminUsersHeader } from "./_components/AdminUsersHeader";
import { AdminUsersContent } from "./_components/AdminUsersContent";
import { ConfirmActionModal } from "./_components/ConfirmActionModal";
import { getAdminUsersModalConfig } from "./_components/AdminUsersModalConfig";
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

  const modal = getAdminUsersModalConfig(pendingAction, currentUser?.id);

  return (
    <div className="space-y-6 p-6" data-testid="admin-users-page">
      <AdminUsersHeader total={filteredUsers.length} onRefresh={loadUsers} />

      <AdminUsersContent
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        notice={notice}
        loading={loading}
        errorMsg={errorMsg}
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

      <ConfirmActionModal
        open={!!pendingAction}
        title={modal.title}
        message={modal.message}
        confirmLabel={modal.confirmLabel}
        onCancel={() => setPendingAction(null)}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}