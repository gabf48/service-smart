"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Notice, ReviewRow } from "../_types/reviews";

export function useAdminReviewsData() {
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);

  const fetchReviews = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      setNotice({ type: "error", text: error.message });
      setReviews([]);
      return;
    }

    setReviews(data ?? []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const setApproved = async (id: string, value: boolean) => {
    if (busyId) return;
    setBusyId(id);
    setNotice(null);

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_approved: value } : r))
    );

    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: value })
      .eq("id", id);

    setBusyId(null);

    if (error) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_approved: !value } : r))
      );
      setNotice({ type: "error", text: error.message });
      return false;
    }

    setNotice({
      type: "success",
      text: value ? "Review aprobat." : "Mutat în pending.",
    });

    return true;
  };

  const deleteReview = async (id: string) => {
    if (busyId) return;
    setBusyId(id);
    setNotice(null);

    const previous = reviews;
    setReviews((prev) => prev.filter((r) => r.id !== id));

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    setBusyId(null);

    if (error) {
      setReviews(previous);
      setNotice({ type: "error", text: error.message });
      return false;
    }

    setNotice({ type: "success", text: "Review șters." });
    return true;
  };

  const bulkApprove = async (ids: string[]) => {
    if (!ids.length) return;

    const previous = reviews;
    setReviews((prev) =>
      prev.map((r) => (ids.includes(r.id) ? { ...r, is_approved: true } : r))
    );

    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: true })
      .in("id", ids);

    if (error) {
      setReviews(previous);
      setNotice({ type: "error", text: error.message });
      return false;
    }

    setNotice({ type: "success", text: `${ids.length} review-uri aprobate.` });
    return true;
  };

  const bulkMoveToPending = async (ids: string[]) => {
    if (!ids.length) return;

    const previous = reviews;
    setReviews((prev) =>
      prev.map((r) => (ids.includes(r.id) ? { ...r, is_approved: false } : r))
    );

    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: false })
      .in("id", ids);

    if (error) {
      setReviews(previous);
      setNotice({ type: "error", text: error.message });
      return false;
    }

    setNotice({ type: "success", text: `${ids.length} review-uri mutate în pending.` });
    return true;
  };

  const bulkDelete = async (ids: string[]) => {
    if (!ids.length) return;

    const previous = reviews;
    setReviews((prev) => prev.filter((r) => !ids.includes(r.id)));

    const { error } = await supabase
      .from("reviews")
      .delete()
      .in("id", ids);

    if (error) {
      setReviews(previous);
      setNotice({ type: "error", text: error.message });
      return false;
    }

    setNotice({ type: "success", text: `${ids.length} review-uri șterse.` });
    return true;
  };

  return {
    loading,
    busyId,
    notice,
    setNotice,
    reviews,
    setReviews,
    fetchReviews,
    setApproved,
    deleteReview,
    bulkApprove,
    bulkMoveToPending,
    bulkDelete,
  };
}