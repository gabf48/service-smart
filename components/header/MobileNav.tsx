"use client";

import Link from "next/link";
import { mobileItemClass, navItems, isActivePath } from "./headerUtils";

export function MobileNav({
  pathname,
  user,
  role,
  logout,
  onClose,
}: {
  pathname: string | null;
  user: any;
  role: "admin" | "user" | null;
  logout: () => Promise<void>;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-white/10 bg-black/75 backdrop-blur-xl lg:hidden">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileItemClass(isActivePath(pathname, item.href))}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}

            {!user && (
              <>
                {/* <Link
                  href="/login"
                  className={mobileItemClass(isActivePath(pathname, "/login"))}
                  onClick={onClose}
                >
                  Autentificare
                </Link>
                <Link
                  href="/register"
                  className={mobileItemClass(isActivePath(pathname, "/register"))}
                  onClick={onClose}
                >
                  Cont nou
                </Link> */}
              </>
            )}

            {user && role === "user" && (
              <Link
                href="/dashboard/user"
                className="rounded-xl bg-blue-600/90 px-4 py-3 font-semibold transition hover:bg-blue-600"
                onClick={onClose}
              >
                Dashboard
              </Link>
            )}

            {user && role === "admin" && (
              <Link
                href="/dashboard/admin"
                className="rounded-xl bg-green-600/90 px-4 py-3 font-semibold transition hover:bg-green-600"
                onClick={onClose}
              >
                Admin
              </Link>
            )}

            {user && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="rounded-xl bg-red-600/90 px-4 py-3 text-left font-semibold transition hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}