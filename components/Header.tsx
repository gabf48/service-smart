"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { user, role, logout } = useAuth();

  return (
    <header className="p-4 flex justify-between items-center bg-black/80 text-white">
      <h1 className="font-bold text-lg">Service Smart</h1>

      <nav className="flex gap-4 items-center">
        {/* Email logat */}
        {user && <span className="text-sm text-gray-300">{user.email}</span>}

        {/* Link-uri universale */}
        <Link href="/home">Acasa</Link>
        <Link href="/servicii">Servicii</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/reviews">Reviews</Link>

        {/* Guest */}
        {!user && (
          <>
            <Link href="/login">Authentificare</Link>
            <Link href="/register">Cont nou</Link>
          </>
        )}

        {/* User/Admin logat */}
        {user && role === "user" && (
          <Link
            href="/dashboard/user"
            className="ml-2 bg-blue-600 px-3 py-1 rounded text-white"
          >
            User Dashboard
          </Link>
        )}

        {user && role === "admin" && (
          <Link
            href="/dashboard/admin"
            className="ml-2 bg-green-600 px-3 py-1 rounded text-white"
          >
            Admin Dashboard
          </Link>
        )}

        {user && (
          <button
            onClick={logout}
            className="ml-2 bg-red-600 px-2 py-1 rounded text-white"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
