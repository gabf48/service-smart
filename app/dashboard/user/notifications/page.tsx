"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserNotificationsPage() {
  return (
    <ProtectedRoute role="user">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Notificări</h1>
        <p>Aici vei vedea notificările tale.</p>
      </div>
    </ProtectedRoute>
  );
}
