"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminReviewsPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Management Recenzii</h1>
        <p>Aici poți vizualiza, adăuga și modifica recenziile clienților.</p>
      </div>
    </ProtectedRoute>
  );
}
