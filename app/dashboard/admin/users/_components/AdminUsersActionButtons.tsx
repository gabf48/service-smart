"use client";

import { useEffect, useRef, useState } from "react";
import type { UserRow } from "../_types/users";
import { AdminUsersActionsMenu } from "./AdminUsersActionsMenu";
import { AdminUsersActionsTrigger } from "./AdminUsersActionsTrigger";

export function AdminUsersActionButtons({
  user,
  currentUserId,
  onMakeAdmin,
  onMakeUser,
  onResetPassword,
  onToggleActive,
  busyAction,
}: {
  user: UserRow;
  currentUserId?: string;
  onMakeAdmin: (user: UserRow) => void;
  onMakeUser: (user: UserRow) => void;
  onResetPassword: (user: UserRow) => void;
  onToggleActive: (user: UserRow) => void;
  busyAction?: string | null;
}) {
  const isSelf = currentUserId === user.id;
  const isBusy = !!busyAction;
  const isResetBusy = busyAction === `reset:${user.id}`;
  const isMakeAdminBusy = busyAction === `make-admin:${user.id}`;
  const isMakeUserBusy = busyAction === `make-user:${user.id}`;
  const isToggleBusy = busyAction === `toggle-active:${user.id}`;

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isBusy) setOpen(false);
  }, [isBusy]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <AdminUsersActionsTrigger
        isBusy={isBusy}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <AdminUsersActionsMenu
          user={user}
          isSelf={isSelf}
          isBusy={isBusy}
          isResetBusy={isResetBusy}
          isMakeAdminBusy={isMakeAdminBusy}
          isMakeUserBusy={isMakeUserBusy}
          isToggleBusy={isToggleBusy}
          onMakeAdmin={() => {
            setOpen(false);
            onMakeAdmin(user);
          }}
          onMakeUser={() => {
            setOpen(false);
            onMakeUser(user);
          }}
          onResetPassword={() => {
            setOpen(false);
            onResetPassword(user);
          }}
          onToggleActive={() => {
            setOpen(false);
            onToggleActive(user);
          }}
        />
      )}
    </div>
  );
}