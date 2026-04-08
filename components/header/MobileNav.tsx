"use client";

import Link from "next/link";
import { mobileItemClass, isActivePath } from "./headerUtils";

export function MobileNav({
  pathname,
  onClose,
}: {
  pathname: string | null;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-white/10 bg-black/75 backdrop-blur-xl lg:hidden">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/home"
              className={mobileItemClass(isActivePath(pathname, "/home"))}
              onClick={onClose}
            >
              Acasă
            </Link>

            <Link
              href="/servicii"
              className={mobileItemClass(isActivePath(pathname, "/servicii"))}
              onClick={onClose}
            >
              Servicii
            </Link>

            <Link
              href="/contact"
              className={mobileItemClass(isActivePath(pathname, "/contact"))}
              onClick={onClose}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}