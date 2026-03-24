"use client";

import Link from "next/link";
import { linkClass, navItems, isActivePath } from "./headerUtils";

export function DesktopNav({
  pathname,
  user,
  role,
  logout,
}: {
  pathname: string | null;
  user: any;
  role: "admin" | "user" | null;
  logout: () => Promise<void>;
}) {
  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link key={item.href} href={item.href} className={linkClass(active)}>
            {active && (
              <span className="absolute inset-0 -z-10 rounded-full bg-white/15 ring-1 ring-white/20" />
            )}
            {item.label}
          </Link>
        );
      })}

      {!user && (
        <>
          <Link href="/login" className={linkClass(isActivePath(pathname, "/login"))}>
            Autentificare
          </Link>
          <Link href="/register" className={linkClass(isActivePath(pathname, "/register"))}>
            Cont nou
          </Link>
        </>
      )}

      {user && role === "user" && (
        <Link
          href="/dashboard/user"
          className="rounded-full bg-blue-600/90 px-3 py-2 text-sm shadow-sm transition hover:bg-blue-600"
        >
          Dashboard
        </Link>
      )}

      {user && role === "admin" && (
        <Link
          href="/dashboard/admin"
          className="rounded-full bg-green-600/90 px-3 py-2 text-sm shadow-sm transition hover:bg-green-600"
        >
          Admin
        </Link>
      )}

      {user && (
        <button
          onClick={logout}
          className="rounded-full bg-red-600/90 px-3 py-2 text-sm shadow-sm transition hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
}