"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { user, role, logout } = useAuth();

  return (
    <header className="p-4 flex justify-between items-center bg-black/80 text-white">
      <h1 className="font-bold text-lg">Service Smart</h1>

      <nav className="flex gap-4 items-center">
        <Link href="/">Home</Link>

        {/* Guest */}
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {/* User */}
        {user && role === "user" && (
          <>
            <Link href="/dashboard/user">Dashboard</Link>
            <Link href="/dashboard/user/history">History</Link>
            <span className="ml-2 text-sm text-gray-300">{user.email}</span>
            <button onClick={logout} className="ml-2 bg-red-600 px-2 py-1 rounded text-white">
              Logout
            </button>
          </>
        )}

        {/* Admin */}
        {user && role === "admin" && (
          <>
            <Link href="/dashboard/admin">Dashboard Admin</Link>
            <span className="ml-2 text-sm text-gray-300">{user.email}</span>
            <button onClick={logout} className="ml-2 bg-red-600 px-2 py-1 rounded text-white">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
