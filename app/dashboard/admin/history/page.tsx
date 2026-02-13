"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("user_history")
        .select("id, user_id, description, created_at")
        .order("created_at", { ascending: false });

      if (error) console.log(error);
      else setHistory(data || []);
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Toți clienții - History</h1>
      <ul className="list-disc pl-5">
        {history.map((item) => (
          <li key={item.id}>
            User {item.user_id}: {item.description} (
            {new Date(item.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
