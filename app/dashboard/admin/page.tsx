"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("auth.users")
        .select("id, email, raw_user_meta_data");
      if (error) console.log(error);
      else setUsers(data || []);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.raw_user_meta_data?.role || "user"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
