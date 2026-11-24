"use client";

import Link from "next/link";
import { linkClass, isActivePath } from "./headerUtils";
import { useAuth } from "@/app/context/AuthContext";

export function DesktopNav({
  pathname,
}: {
  pathname: string | null;
}) {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  return (
    <nav className="hidden items-center gap-2 lg:flex">
      <Link href="/home" className={linkClass(isActivePath(pathname, "/home"))}>
        Acasă
      </Link>

      <Link
        href="/servicii"
        className={linkClass(isActivePath(pathname, "/servicii"))}
      >
        Servicii
      </Link>

      <Link
        href="/contact"
        className={linkClass(isActivePath(pathname, "/contact"))}
      >
        Contact
      </Link>

      <Link
        href="/reviews"
        className={linkClass(isActivePath(pathname, "/reviews"))}
      >
        Recenzii
      </Link>

      {isAdmin && (
        <Link
          href="/service"
          className={linkClass(isActivePath(pathname, "/service"))}
        >
          Service
        </Link>
      )}
    </nav>
  );
}