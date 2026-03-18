export type UserRow = {
  id: string;
  email: string;
  role: "admin" | "user";
  is_active: boolean;
};

export type RoleFilter = "all" | "admin" | "user";

export type PendingAction =
  | {
      type: "make-admin";
      user: UserRow;
    }
  | {
      type: "make-user";
      user: UserRow;
    }
  | {
      type: "reset-password";
      user: UserRow;
    }
  | {
      type: "toggle-active";
      user: UserRow;
    }
  | null;