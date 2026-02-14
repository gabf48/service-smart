"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPostsPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Management Postări</h1>
        <p>Aici poți vizualiza, adăuga și modifica postările pentru site.</p>
      </div>
    </ProtectedRoute>
  );
}
