"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminFinancesPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Financiar</h1>
        <p>Aici poți vizualiza și gestiona date financiare.</p>
      </div>
    </ProtectedRoute>
  );
}
