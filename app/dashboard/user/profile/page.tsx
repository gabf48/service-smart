"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserPersonalPage() {
  return (
    <ProtectedRoute role="user">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Date personale</h1>
        <p>Aici poți vizualiza și edita datele tale personale.</p>
      </div>
    </ProtectedRoute>
  );
}
