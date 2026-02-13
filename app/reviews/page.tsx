"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      setReviews(data || []);
    };

    fetch();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Recenzii clienți</h1>

      {reviews.map(r => (
        <div key={r.id} className="border p-4 mb-4">
          ⭐ {r.rating}/5
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
