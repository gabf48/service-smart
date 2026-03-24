"use client";

import { useEffect, useMemo, useState } from "react";

export function useReviewFormState(user: any) {
  const isLogged = !!user;

  const [submitting, setSubmitting] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const computedLockedName = useMemo(() => {
    const metaName =
      user?.user_metadata?.full_name || user?.user_metadata?.name || "";

    if (metaName) return String(metaName);

    const em = user?.email || "";
    if (em.includes("@")) return em.split("@")[0];
    return "";
  }, [user]);

  useEffect(() => {
    if (!isLogged) return;

    if (computedLockedName) setDisplayName(computedLockedName);
    if (user?.email) setEmail(user.email);
  }, [isLogged, computedLockedName, user]);

  return {
    isLogged,
    submitting,
    setSubmitting,
    uploadPct,
    setUploadPct,
    displayName,
    setDisplayName,
    email,
    setEmail,
    phone,
    setPhone,
    rating,
    setRating,
    comment,
    setComment,
    computedLockedName,
  };
}