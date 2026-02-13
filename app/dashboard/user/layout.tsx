"use client";

import Header from "@/components/Header";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/app/context/AuthContext";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar pentru user */}
      <DashboardSidebar role={role} />

      <div className="flex-1">
        {/* Header cu info user */}
        <Header userEmail={user?.email} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
