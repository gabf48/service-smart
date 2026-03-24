import type { RoadmapStatus } from "@/app/roadmap";

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Acasa", href: "/home" },
  { label: "Servicii", href: "/servicii" },
  { label: "Contact", href: "/contact" },
  { label: "Posts", href: "/posts" },
  { label: "Reviews", href: "/reviews" },
];

export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function linkClass(active: boolean) {
  return [
    "relative rounded-full px-3 py-2 text-sm whitespace-nowrap transition-all duration-200",
    "hover:bg-white/10",
    active ? "text-white" : "text-white/80",
  ].join(" ");
}

export function mobileItemClass(active: boolean) {
  return [
    "w-full rounded-xl px-4 py-3 text-left transition",
    active
      ? "bg-white/10 text-white ring-1 ring-white/15"
      : "text-white/85 hover:bg-white/5",
  ].join(" ");
}