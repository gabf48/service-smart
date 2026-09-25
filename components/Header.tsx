"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { useAuth } from "@/app/context/useAuth";
import { PhoneBadge } from "./header/PhoneBadge";
import { DesktopNav } from "./header/DesktopNav";
import { MobileMenuButton } from "./header/MobileMenuButton";
import { MobileNav } from "./header/MobileNav";

export default function Header() {
  // const { user, role, logout } = useAuth();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full bg-black/70 text-white backdrop-blur-xl transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-md",
      ].join(" ")}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-300",
          scrolled ? "py-3" : "py-5",
        ].join(" ")}
      >
       <h1 className="shrink-0 flex items-center">
  <Link href="/home" className="flex items-center gap-3">
  <Image
    src="/logo2.png"
    alt="Service Smart"
    width={420}
    height={120}
    className="h-20 md:h-24 w-auto object-contain transition-all duration-300"
    priority
  />
</Link>
</h1>

        <div className="ml-auto flex min-w-0 items-center gap-3">
          <PhoneBadge />

          <DesktopNav
            pathname={pathname}
            // user={user}
            // role={role}
            // logout={logout}
          />

          <MobileMenuButton
            mobileOpen={mobileOpen}
            onToggle={() => setMobileOpen((v) => !v)}
          />
        </div>
      </div>

      {mobileOpen && (
        <MobileNav
          pathname={pathname}
          // user={user}
          // role={role}
          // logout={logout}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <div className="h-px w-full bg-white/10" />
    </header>
  );
}