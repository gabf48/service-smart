"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

type NavItem = { label: string; href: string };

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
      "relative rounded-full px-3 py-2 text-base",
      "transition-all duration-200",
      "hover:bg-white/10",
      active ? "text-white" : "text-white/80",
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
      {/* top glow line */}
     <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />


      <div
        className={[
          "mx-auto max-w-6xl flex items-center justify-between",
          "transition-all duration-300",
          scrolled ? "py-3 px-4" : "py-5 px-4",
        ].join(" ")}
      >
        <h1
          className={[
            "font-bold tracking-wide",
            "transition-all duration-300",
            scrolled ? "text-base" : "text-lg",
          ].join(" ")}
        >
          <Link href="/home">Service Smart</Link>
        </h1>

        <nav className="flex items-center gap-4 sm:gap-4 flex-wrap justify-end">
          {/* Email logat */}
          {user && (
            <span className="hidden sm:inline text-sm text-gray-300 mr-1">
              {user.email}
            </span>
          )}

          {/* Link-uri universale */}
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
                Authentificare
              </Link>

              <Link href="/register" className={linkClass(isActive("/register"))}>
                {isActive("/register") && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/15 ring-1 ring-white/20" />
                )}
                Cont nou
              </Link>
            </>
          )}

          {/* Dashboard buttons */}
          {user && role === "user" && (
            <Link
              href="/dashboard/user"
              className={[
                "ml-1 rounded-full px-3 py-2 text-sm",
                "transition-all duration-200",
                "bg-blue-600/90 hover:bg-blue-600",
                "shadow-sm",
              ].join(" ")}
            >
              User Dashboard
            </Link>
          )}

          {user && role === "admin" && (
            <Link
              href="/dashboard/admin"
              className={[
                "ml-1 rounded-full px-3 py-2 text-sm",
                "transition-all duration-200",
                "bg-green-600/90 hover:bg-green-600",
                "shadow-sm",
              ].join(" ")}
            >
              Admin Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className={[
                "ml-1 rounded-full px-3 py-2 text-sm",
                "transition-all duration-200",
                "bg-red-600/90 hover:bg-red-600",
                "shadow-sm",
              ].join(" ")}
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {/* bottom hairline */}
      <div className="h-px w-full bg-white/10" />
    </header>
  );
}