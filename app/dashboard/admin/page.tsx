"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute role="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      const user = userRes?.user ?? null;

      const { data: sessionRes } = await supabase.auth.getSession();
      const session = sessionRes?.session ?? null;

      console.log("[ADMIN] getUser:", {
        ok: !!user,
        id: user?.id,
        email: user?.email,
        role: user?.user_metadata?.role,
        error: userErr,
      });

      console.log("[ADMIN] session:", {
        ok: !!session,
        uid: session?.user?.id,
      });

      if (userErr) {
        console.warn("[ADMIN] getUser error:", userErr);
        setUsers([]);
      } else if (user) {
        // pentru debug: afișăm doar userul logat
        setUsers([user]);
      } else {
        setUsers([]);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.user_metadata?.role || "user"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}