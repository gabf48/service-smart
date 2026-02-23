"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardSidebar() {
  const { role } = useAuth();

  return (
    <aside className="w-48 bg-gray-800 text-white min-h-screen p-4 flex flex-col gap-4">
      {role === "user" && (
        <>
          <Link href="/dashboard/user/history" className="hover:bg-gray-700 px-2 py-1 rounded">
            History
          </Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link href="/dashboard/admin/posts" className="hover:bg-gray-700 px-2 py-1 rounded">
            Posts
          </Link>
          <Link href="/dashboard/admin/users" className="hover:bg-gray-700 px-2 py-1 rounded">
            Users
          </Link>
          <Link href="/dashboard/admin/reviews" className="hover:bg-gray-700 px-2 py-1 rounded">
            Reviews
          </Link>
        </>
      )}
    </aside>
  );
}
