"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async () => {
    if (!title || !content) {
      alert("Completează toate câmpurile!");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert([{ title, content }]);

    if (error) alert(error.message);
    else {
      alert("Postare adăugată!");
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Adaugă lucrare</h1>

      <input
        placeholder="Titlu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />

      <textarea
        placeholder="Descriere lucrare"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Publică
      </button>
    </div>
  );
}
