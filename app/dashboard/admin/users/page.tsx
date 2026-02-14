"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminUsersPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Admin — Users
        </h1>
      </div>
    </ProtectedRoute>
  );
}
