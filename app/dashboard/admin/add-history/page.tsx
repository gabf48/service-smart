"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddHistory() {
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    if (!userId || !description) {
      alert("Completează toate câmpurile!");
      return;
    }

    const { data, error } = await supabase
      .from("user_history")
      .insert([{ user_id: userId, description }]);

    if (error) {
      alert(error.message);
    } else {
      alert("Activitate adăugată!");
      setDescription("");
      setUserId("");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Adaugă activitate user</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2"
      />
      <textarea
        placeholder="Descriere activitate"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Adaugă activitate
      </button>
    </div>
  );
}
