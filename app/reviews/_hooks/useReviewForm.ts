"use client";

import { useReviewFiles } from "./useReviewFiles";
import { useReviewFormState } from "./useReviewFormState";
import { useReviewSubmit } from "./useReviewSubmit";
import {
  buildReviewFormData,
  MAX_COMMENT_CHARS,
  MAX_FILES,
} from "../_utils/reviewFormData";

export function useReviewForm(user: any) {
  const state = useReviewFormState(user);
  const files = useReviewFiles();
  const { submitReviewRequest } = useReviewSubmit();

  const reset = () => {
    if (!state.isLogged) state.setDisplayName("");
    if (!state.isLogged) state.setEmail("");

    state.setPhone("");
    state.setRating(5);
    state.setComment("");
    state.setUploadPct(0);
    files.resetFiles();
  };

  const submitReview = async () => {
    if (state.submitting) return;

    state.setUploadPct(0);

    const built = await buildReviewFormData({
      isLogged: state.isLogged,
      computedLockedName: state.computedLockedName,
      displayName: state.displayName,
      email: state.email,
      phone: state.phone,
      rating: state.rating,
      comment: state.comment,
      pickedFiles: files.pickedFiles,
      user,
    });

    if (!built.ok) {
      throw new Error(built.error);
    }

    state.setSubmitting(true);

    try {
      await submitReviewRequest({
        fd: built.fd,
        setUploadPct: state.setUploadPct,
      });
    } finally {
      state.setSubmitting(false);
      state.setUploadPct(0);
    }
  };

  return {
    MAX_FILES,
    MAX_COMMENT_CHARS,
    submitting: state.submitting,
    uploadPct: state.uploadPct,
    isLogged: state.isLogged,
    computedLockedName: state.computedLockedName,
    displayName: state.displayName,
    setDisplayName: state.setDisplayName,
    email: state.email,
    setEmail: state.setEmail,
    phone: state.phone,
    setPhone: state.setPhone,
    rating: state.rating,
    setRating: state.setRating,
    comment: state.comment,
    setComment: state.setComment,
    pickedFiles: files.pickedFiles,
    previews: files.previews,
    onPickFiles: files.onPickFiles,
    removePicked: files.removePicked,
    reset,
    submitReview,
  };
}