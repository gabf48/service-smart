"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function UserHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.log(error);
      else setHistory(data || []);
    };

    fetchHistory();
  }, []);

  return (
     <ProtectedRoute role="user">
    <div>
      <h1 className="text-2xl font-bold mb-4">Istoric activități</h1>
      {history.length === 0 && <p>Nu ai înregistrări încă.</p>}
      <ul className="list-disc pl-5">
        {history.map((item) => (
          <li key={item.id}>
            {new Date(item.created_at).toLocaleString()}: {item.description}
          </li>
        ))}
      </ul>
    </div>
      </ProtectedRoute>
  );
}
