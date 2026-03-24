import { updateUserRole } from "./adminUsersApi";
import type { UserRow } from "../_types/users";

type Notice = { type: "success" | "error"; text: string } | null;
type SetNotice = React.Dispatch<React.SetStateAction<Notice>>;
type SetUsers = React.Dispatch<React.SetStateAction<UserRow[]>>;
type SetBusyAction = React.Dispatch<React.SetStateAction<string | null>>;

export async function changeUserRole({
  id,
  newRole,
  currentUserId,
  setBusyAction,
  setNotice,
  setUsers,
  loadUsers,
  onSelfDowngrade,
}: {
  id: string;
  newRole: "admin" | "user";
  currentUserId?: string;
  setBusyAction: SetBusyAction;
  setNotice: SetNotice;
  setUsers: SetUsers;
  loadUsers: () => Promise<void>;
  onSelfDowngrade: () => void;
}) {
  setBusyAction(`${newRole === "admin" ? "make-admin" : "make-user"}:${id}`);

  const { error } = await updateUserRole(id, newRole);

  if (error) {
    setBusyAction(null);
    setNotice({ type: "error", text: "Nu s-a putut modifica rolul." });
    return;
  }

  setNotice({ type: "success", text: "Rolul a fost actualizat." });

  setUsers((prev) =>
    prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
  );

  if (currentUserId === id && newRole !== "admin") {
    setBusyAction(null);
    onSelfDowngrade();
    return;
  }

  await loadUsers();
  setBusyAction(null);
}