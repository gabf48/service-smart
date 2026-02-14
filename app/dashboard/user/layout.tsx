"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Slidebar";

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
