"use client";

import { useCallback, useEffect, useState } from "react";
import type { Notice } from "../types";

export function useReviewsPage({
  errorMsg,
  fetchApproved,
  submitReview,
  resetForm,
}: {
  errorMsg: string | null;
  fetchApproved: () => void | Promise<void>;
  submitReview: () => Promise<void>;
  resetForm: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [pageNotice, setPageNotice] = useState<Notice>(null);
  const [modalNotice, setModalNotice] = useState<Notice>(null);

  useEffect(() => {
    if (open) setModalNotice(null);
  }, [open]);

  useEffect(() => {
    if (!errorMsg) return;
    setPageNotice({ type: "error", text: errorMsg });
  }, [errorMsg]);

  const openModal = useCallback(() => {
    setModalNotice(null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setModalNotice(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setModalNotice(null);

    try {
      await submitReview();
      setOpen(false);
      resetForm();
      fetchApproved();

      setPageNotice({
        type: "success",
        text: "Mulțumim! Review-ul a fost publicat cu succes.",
      });
    } catch (e: any) {
      setModalNotice({
        type: "error",
        text: e?.message || "Eroare la trimiterea review-ului.",
      });
    }
  }, [submitReview, resetForm, fetchApproved]);

  return {
    open,
    pageNotice,
    setPageNotice,
    modalNotice,
    setModalNotice,
    openModal,
    closeModal,
    handleSubmit,
  };
}