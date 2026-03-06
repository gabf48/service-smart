"use client";

import React from "react";
import type { Notice } from "./types";
import { ReviewModalHeader } from "./ReviewModalHeader";
import { ReviewModalForm } from "./ReviewModalForm";
import { ReviewModalFooter } from "./ReviewModalFooter";

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
}: {
  open: boolean;
  onClose: () => void;
  submitting: boolean;

  isLogged: boolean;
  computedLockedName: string;

  rating: number;
  setRating: (v: number) => void;
  displayName: string;
  setDisplayName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;

  MAX_FILES: number;
  pickedFiles: File[];
  previews: string[];
  onPickFiles: (list: FileList | null) => void;
  removePicked: (idx: number) => void;

  onSubmit: () => void | Promise<void>;

  notice?: Notice;
  onDismissNotice?: () => void;

  uploadPct?: number;
  maxCommentChars?: number;
}) {
  if (!open) return null;
const canSubmit =
    !!comment.trim() &&
    (isLogged ? !!computedLockedName.trim() : !!displayName.trim()) &&
    rating >= 1 &&
    rating <= 5;
  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-dvh px-4 py-6 sm:py-10 flex items-start justify-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <div className="relative w-full max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-gray-950/85 shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            <ReviewModalHeader onClose={onClose} notice={notice} onDismissNotice={onDismissNotice} />

            <ReviewModalForm
              submitting={submitting}
              isLogged={isLogged}
              computedLockedName={computedLockedName}
              rating={rating}
              setRating={setRating}
              displayName={displayName}
              setDisplayName={setDisplayName}
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
  onSubmit={onSubmit}
/>
          </div>
        </div>

        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            * {
              scroll-behavior: auto !important;
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}