"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeaveReview() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Nu ești logat!");

    const { error } = await supabase.from("reviews").insert([
      {
        user_id: user.id,
        rating,
        comment,
      },
    ]);

    if (error) alert(error.message);
    else {
      alert("Review trimis!");
      setComment("");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Lasă un review</h1>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2"
      >
        {[5,4,3,2,1].map(r => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <textarea
        placeholder="Comentariu"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={submitReview}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Trimite
      </button>
    </div>
  );
}
