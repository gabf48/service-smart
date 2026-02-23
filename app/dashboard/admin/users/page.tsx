"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminUsersPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Utilizatori</h1>
        <p>Aici poți gestiona utilizatorii.</p>
      </div>
    </ProtectedRoute>
  );
}
