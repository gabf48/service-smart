"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AddHistory() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [description, setDescription] = useState("");
  

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("profiles").select("id, email");


      if (error) console.log(error);
      else setUsers(data || []);
    };

    fetchUsers();
  }, []);

  const handleAdd = async () => {
    if (!selectedUserId || !description) {
      alert("Completează toate câmpurile!");
      return;
    }

    const { data, error } = await supabase
      .from("user_history")
      .insert([{ user_id: selectedUserId, description }]);

    if (error) alert(error.message);
    else {
      alert("Activitate adăugată!");
      setDescription("");
      setSelectedUserId("");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Adaugă activitate user</h1>

      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="border p-2"
      >
        <option value="">Selectează user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>

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
