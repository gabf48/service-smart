"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Slidebar";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <main className="relative flex-1 p-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/space.gif"
            alt="Space background"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black" />
        </div>

        <div className="relative">{children}</div>
      </main>
    </div>
  );
}