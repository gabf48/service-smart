"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

interface SidebarProps {
  role: string | null;
}

export default function DashboardSidebar({ role }: SidebarProps) {
  if (!role) return null; // nu afișăm sidebar dacă nu e logat

  return (
    <aside className="w-48 bg-gray-800 text-white min-h-screen p-4 flex flex-col gap-4">
      {/* Link-uri comune pentru user */}
      {role === "user" && (
        <>
          <Link href="/dashboard/user" className="hover:text-yellow-400">
            Dashboard
          </Link>
          <Link href="/dashboard/user/history" className="hover:text-yellow-400">
            History
          </Link>
        </>
      )}

      {/* Link-uri pentru admin, dacă e nevoie mai târziu */}
      {role === "admin" && (
        <>
          <Link href="/dashboard/admin" className="hover:text-yellow-400">
            Dashboard Admin
          </Link>
          <Link href="/dashboard/admin/posts" className="hover:text-yellow-400">
            Posts
          </Link>
        </>
      )}
    </aside>
  );
}
