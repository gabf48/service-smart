// app/reviews/page.tsx
"use client";

import React, { useCallback, useState, useEffect } from "react";
import { ReviewsHero } from "./_components/ReviewsHero";
import { ReviewsList } from "./_components/ReviewsList";
import { ReviewModal } from "./_components/ReviewModal";
import { useReviews } from "./_hooks/useReviews";
import { useReviewForm } from "./_hooks/useReviewForm";
import { useAuth } from "../context/AuthContext";

type Notice = { type: "success" | "error"; text: string } | null;

export default function Page() {
  const { user } = useAuth();

  const { reviews, avg, count, loading, errorMsg, fetchApproved } = useReviews();

  const [open, setOpen] = useState(false);
  const [pageNotice, setPageNotice] = useState<Notice>(null);
  const [modalNotice, setModalNotice] = useState<Notice>(null);

  const form = useReviewForm(user);

   useEffect(() => {
    if (open) setModalNotice(null);
  }, [open]);

  const openModal = useCallback(() => {
    setModalNotice(null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setModalNotice(null);
  }, []);

  const handleSubmit = useCallback(async () => {
  setModalNotice(null); // ✅ curăță înainte de submit/validări

  try {
    await form.submitReview();

    // dacă vrei să închizi imediat modalul, mesajul de succes NU are ce să rămână
    setOpen(false);
    form.reset();
    fetchApproved();

    // dacă vrei succes pe pagină:
    setPageNotice({
      type: "success",
      text: "Mulțumim! Review-ul a fost trimis și va apărea după aprobarea adminului.",
    });
  } catch (e: any) {
    setModalNotice({ type: "error", text: e?.message || "Eroare la trimiterea review-ului." });
  }
}, [form, fetchApproved]);

  // dacă vrei să afișezi errorMsg din useReviews în banner global:
  // (opțional, dar util)
  // React.useEffect(() => { if (errorMsg) setPageNotice({ type: "error", text: errorMsg }); }, [errorMsg]);

  
  return (
    <div className="space-bg min-h-dvh text-white">
      <ReviewsHero
        avg={avg}
        count={count}
        onOpen={openModal}
        notice={pageNotice}
        onCloseNotice={() => setPageNotice(null)}
      />

      <ReviewsList reviews={reviews} loading={loading} onRefresh={fetchApproved} />

      <ReviewModal
        open={open}
        onClose={closeModal}
        submitting={form.submitting}
        isLogged={form.isLogged}
        computedLockedName={form.computedLockedName}
        rating={form.rating}
        setRating={form.setRating}
        displayName={form.displayName}
        setDisplayName={form.setDisplayName}
        email={form.email}
        setEmail={form.setEmail}
        phone={form.phone}
        setPhone={form.setPhone}
        comment={form.comment}
        setComment={form.setComment}
        MAX_FILES={form.MAX_FILES}
        pickedFiles={form.pickedFiles}
        previews={form.previews}
        onPickFiles={form.onPickFiles}
        removePicked={form.removePicked}
        onSubmit={handleSubmit}
        notice={modalNotice}
        onDismissNotice={() => setModalNotice(null)}
        uploadPct={form.uploadPct}
        maxCommentChars={form.MAX_COMMENT_CHARS ?? 1000}
      />
    </div>
  );
}