import { updateUserActiveStatus } from "./adminUsersApi";
import type { UserRow } from "../_types/users";

type Notice = { type: "success" | "error"; text: string } | null;
type SetNotice = React.Dispatch<React.SetStateAction<Notice>>;
type SetUsers = React.Dispatch<React.SetStateAction<UserRow[]>>;
type SetBusyAction = React.Dispatch<React.SetStateAction<string | null>>;

export async function toggleUserActiveState({
  user,
  setBusyAction,
  setNotice,
  setUsers,
  loadUsers,
}: {
  user: UserRow;
  setBusyAction: SetBusyAction;
  setNotice: SetNotice;
  setUsers: SetUsers;
  loadUsers: () => Promise<void>;
}) {
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
}