"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/useAuth";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { role } = useAuth();
  const pathname = usePathname();

  const userMenu = [
    { label: "Istoric", href: "/dashboard/user/history" },
    { label: "Date personale", href: "/dashboard/user/profile" },
    { label: "Notificări", href: "/dashboard/user/notifications" },
    { label: "Securitate", href: "/dashboard/user/security" },
  ];

  const adminMenu = [
    { label: "Users", href: "/dashboard/admin/users" },
    { label: "Contact Requests", href: "/dashboard/admin/contact" },
    { label: "Financiar", href: "/dashboard/admin/financial" },
    { label: "Posts", href: "/dashboard/admin/posts" },
    { label: "Reviews", href: "/dashboard/admin/reviews" },
  ];

  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <aside className="min-h-screen w-56 bg-gray-900 p-4 text-white">
      <ul className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded p-2 hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 font-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}