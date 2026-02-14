"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserSecurityPage() {
  return (
    <ProtectedRoute role="user">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Securitate</h1>
        <p>Poți gestiona aici parola și setările de securitate.</p>
      </div>
    </ProtectedRoute>
  );
}
