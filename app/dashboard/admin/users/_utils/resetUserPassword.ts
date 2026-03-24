import { sendResetPasswordEmail } from "./adminUsersApi";
import type { UserRow } from "../_types/users";

type Notice = { type: "success" | "error"; text: string } | null;
type SetNotice = React.Dispatch<React.SetStateAction<Notice>>;
type SetBusyAction = React.Dispatch<React.SetStateAction<string | null>>;

export async function resetUserPassword({
  user,
  setBusyAction,
  setNotice,
}: {
  user: UserRow;
  setBusyAction: SetBusyAction;
  setNotice: SetNotice;
}) {
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
}