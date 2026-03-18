"use client";

import { useEffect, useRef, useState } from "react";
import type { UserRow } from "../_types/users";

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
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isBusy) setOpen(false);
  }, [isBusy]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={isBusy}
        className={`inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-semibold transition ${
          isBusy
            ? "cursor-not-allowed bg-white/10 opacity-40"
            : "bg-white/10 hover:bg-white/15"
        }`}
      >
        {isBusy ? "Processing..." : "Actions"}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-gray-950/95 shadow-2xl backdrop-blur-md">
          <button
            type="button"
            disabled={user.role === "admin" || isBusy}
            onClick={() => {
              setOpen(false);
              onMakeAdmin(user);
            }}
            className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
              user.role === "admin" || isBusy
                ? "cursor-not-allowed text-white/30"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isMakeAdminBusy ? "Saving..." : "Make admin"}
          </button>

          <button
            type="button"
            disabled={user.role === "user" || isBusy}
            onClick={() => {
              setOpen(false);
              onMakeUser(user);
            }}
            className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
              user.role === "user" || isBusy
                ? "cursor-not-allowed text-white/30"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isMakeUserBusy ? "Saving..." : isSelf ? "Remove admin" : "Make user"}
          </button>

          <button
            type="button"
            disabled={isBusy}
            onClick={() => {
              setOpen(false);
              onResetPassword(user);
            }}
            className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
              isBusy
                ? "cursor-not-allowed text-white/30"
                : "text-amber-300 hover:bg-white/10"
            }`}
          >
            {isResetBusy ? "Sending..." : "Reset password"}
          </button>

          <button
            type="button"
            disabled={isBusy || isSelf}
            onClick={() => {
              setOpen(false);
              onToggleActive(user);
            }}
            className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${
              isBusy || isSelf
                ? "cursor-not-allowed text-white/30"
                : user.is_active
                ? "text-red-300 hover:bg-white/10"
                : "text-green-300 hover:bg-white/10"
            }`}
          >
            {isToggleBusy
              ? "Saving..."
              : user.is_active
              ? "Deactivate user"
              : "Activate user"}
          </button>
        </div>
      )}
    </div>
  );
}