"use client";

import Link from "next/link";
import { linkClass, isActivePath } from "./headerUtils";

export function DesktopNav({
  pathname,
}: {
  pathname: string | null;
}) {
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
    </nav>
  );
}