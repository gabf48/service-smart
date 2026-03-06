"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type ReviewRow = {
  id: string;
  user_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  display_name: string;
  email: string | null;
  phone: string | null;
  attachments: string[];
  is_approved: boolean;
};

export function useReviews() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchApproved = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("reviews")
      .select("id,user_id,rating,comment,created_at,display_name,email,phone,attachments,is_approved")
      .eq("is_approved", true)
     .order("rating", { ascending: false })
.order("created_at", { ascending: false })

    if (error) {
      setReviews([]);
      setAvg(0);
      setCount(0);
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const rows = (data || []) as ReviewRow[];
    setReviews(rows);

    const c = rows.length;
    const a = c === 0 ? 0 : rows.reduce((s, r) => s + (r.rating || 0), 0) / c;

    setCount(c);
    setAvg(a);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchApproved();
  }, [fetchApproved]);

  return { reviews, avg, count, loading, errorMsg, fetchApproved };
}