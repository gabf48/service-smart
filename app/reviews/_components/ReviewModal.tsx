"use client";

import { useState } from "react";
import { ReviewModalHeader } from "./ReviewModalHeader";
import { ReviewModalForm } from "./ReviewModalForm";
import { ReviewModalFooter } from "./ReviewModalFooter";
import { ReviewModalShell } from "./ReviewModalShell";
import type { ReviewModalProps } from "./types";

export function ReviewModal({
  open,
  onClose,
  submitting,
  isLogged,
  computedLockedName,
  rating,
  setRating,
  displayName,
  setDisplayName,
  email,
  setEmail,
  phone,
  setPhone,
  comment,
  setComment,
  MAX_FILES,
  pickedFiles,
  previews,
  onPickFiles,
  removePicked,
  onSubmit,
  notice = null,
  onDismissNotice,
  uploadPct = 0,
  maxCommentChars = 1000,
}: ReviewModalProps) {
  const [nameError, setNameError] = useState("");

  const effectiveName = isLogged
    ? computedLockedName || "Utilizator"
    : displayName;

  const canSubmit =
  !!comment.trim() &&
  rating >= 1 &&
  rating <= 5;

  const handleSubmit = () => {
    if (!isLogged && !displayName.trim()) {
      setNameError("Numele este obligatoriu.");
      return;
    }

    setNameError("");
    onSubmit();
  };

  return (
    <ReviewModalShell open={open} onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-gray-950/85 shadow-2xl [-webkit-overflow-scrolling:touch]">
        <ReviewModalHeader
          onClose={onClose}
          notice={notice}
          onDismissNotice={onDismissNotice}
        />

       <ReviewModalForm
  submitting={submitting}
  isLogged={isLogged}
  computedLockedName={computedLockedName}
  rating={rating}
  setRating={setRating}
  displayName={displayName}
  setDisplayName={setDisplayName}
  nameError={nameError}
  setNameError={setNameError}
  comment={comment}
  setComment={setComment}
  maxCommentChars={maxCommentChars}
  MAX_FILES={MAX_FILES}
  pickedFiles={pickedFiles}
  previews={previews}
  onPickFiles={onPickFiles}
  removePicked={removePicked}
/>

        <ReviewModalFooter
          submitting={submitting}
          uploadPct={uploadPct}
          canSubmit={canSubmit}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    </ReviewModalShell>
  );
}