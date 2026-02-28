"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

type NavItem = { label: string; href: string };

const PHONE_DISPLAY = "+40 746 263 481";
const PHONE_TEL = "+40746263481";

function PhoneBadge() {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={[
        "group flex items-center gap-3",
        "rounded-full bg-white/10 backdrop-blur-xl border border-white/15",
        "px-4 py-2 shadow-lg",
        "transition-all duration-300",
        "hover:border-blue-500/40 hover:shadow-blue-500/25",
        "whitespace-nowrap flex-nowrap shrink-0",
      ].join(" ")}
      aria-label={`Sună ${PHONE_DISPLAY}`}
    >
      {/* ping dot */}
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
      </span>

      {/* desktop number */}
      <span className="hidden lg:inline text-sm font-semibold text-white group-hover:text-blue-300 transition whitespace-nowrap tabular-nums">
        {PHONE_DISPLAY}
      </span>

      {/* availability - only large screens */}
      <span className="hidden xl:inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 whitespace-nowrap">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Disponibil&nbsp;acum
      </span>

      {/* mobile compact */}
      <span className="lg:hidden text-sm font-semibold text-white">
        Sună
      </span>
    </a>
  );
}

export default function Header() {
  const { user, role, logout } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Acasa", href: "/home" },
      { label: "Servicii", href: "/servicii" },
      { label: "Contact", href: "/contact" },
      { label: "Posts", href: "/posts" },
      { label: "Reviews", href: "/reviews" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const linkClass = (active: boolean) =>
    [
      "relative rounded-full px-3 py-2 text-sm",
      "transition-all duration-200",
      "hover:bg-white/10",
      active ? "text-white" : "text-white/80",
      "whitespace-nowrap",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full text-white",
        "bg-black/70 backdrop-blur-xl",
        "transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-md",
      ].join(" ")}
    >
      {/* top glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div
        className={[
          "mx-auto max-w-6xl flex items-center justify-between gap-4",
          "transition-all duration-300",
          scrolled ? "py-3 px-4" : "py-5 px-4",
        ].join(" ")}
      >
        {/* Logo */}
        <h1
          className={[
            "font-bold tracking-wide shrink-0",
            "transition-all duration-300",
            scrolled ? "text-base" : "text-lg",
          ].join(" ")}
        >
          <Link href="/home">Service Smart</Link>
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-auto min-w-0">
          <PhoneBadge />

          <nav
            className={[
              "flex items-center gap-2 sm:gap-3",
              "flex-nowrap whitespace-nowrap",
              "overflow-x-auto",
              "max-w-[55vw] lg:max-w-none",
              "[-ms-overflow-style:none] [scrollbar-width:none]",
            ].join(" ")}
          >
            <style jsx>{`
              nav::-webkit-scrollbar {
                display: none;
              }
            `}</style>

    
          
            {/* Universal links */}
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} className={linkClass(active)}>
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/15 ring-1 ring-white/20" />
                  )}
                  {item.label}
                </Link>
              );
            })}

            {/* Guest */}
            {!user && (
              <>
                <Link href="/login" className={linkClass(isActive("/login"))}>
                  {isActive("/login") && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/15 ring-1 ring-white/20" />
                  )}
                  Autentificare
                </Link>

                <Link href="/register" className={linkClass(isActive("/register"))}>
                  {isActive("/register") && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/15 ring-1 ring-white/20" />
                  )}
                  Cont nou
                </Link>
              </>
            )}

            {/* User dashboard */}
            {user && role === "user" && (
              <Link
                href="/dashboard/user"
                className="rounded-full px-3 py-2 text-sm bg-blue-600/90 hover:bg-blue-600 transition shadow-sm whitespace-nowrap"
              >
                Dashboard
              </Link>
            )}

            {/* Admin dashboard */}
            {user && role === "admin" && (
              <Link
                href="/dashboard/admin"
                className="rounded-full px-3 py-2 text-sm bg-green-600/90 hover:bg-green-600 transition shadow-sm whitespace-nowrap"
              >
                Admin
              </Link>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={logout}
                className="rounded-full px-3 py-2 text-sm bg-red-600/90 hover:bg-red-600 transition shadow-sm whitespace-nowrap"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* bottom hairline */}
      <div className="h-px w-full bg-white/10" />
    </header>
  );
}