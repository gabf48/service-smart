"use client";

import React from "react";
import { StarPicker } from "./StarPicker";

export function ReviewModalForm({
  submitting,
  isLogged,
  computedLockedName,

  rating,
  setRating,
  displayName,
  setDisplayName,
  comment,
  setComment,

  maxCommentChars,

  MAX_FILES,
  pickedFiles,
  previews,
  onPickFiles,
  removePicked,
}: {
  submitting: boolean;

  isLogged: boolean;
  computedLockedName: string;

  rating: number;
  setRating: (v: number) => void;
  displayName: string;
  setDisplayName: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;

  maxCommentChars: number;

  MAX_FILES: number;
  pickedFiles: File[];
  previews: string[];
  onPickFiles: (list: FileList | null) => void;
  removePicked: (idx: number) => void;
}) {
  const showCommentError = !comment.trim();

  return (
    <div className="p-6 sm:p-7 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-semibold">Rating (obligatoriu)</div>
        <div className="mt-2">
          <StarPicker value={rating} onChange={setRating} disabled={submitting} />
        </div>
      </div>

      <div>
        <div className="text-sm text-white/70 mb-1">Nume (obligatoriu)</div>
        <input
          value={isLogged ? computedLockedName : displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={isLogged || submitting}
          placeholder="Numele tău"
          className={[
            "w-full p-3 rounded-xl border transition",
            "focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15",
            isLogged
              ? "bg-gray-700/40 text-gray-300 cursor-not-allowed border-white/10"
              : "bg-gray-900/60 text-white border-white/10",
          ].join(" ")}
        />
      </div>

      <div>
        <div className="text-sm text-white/70 mb-1">Review (obligatoriu)</div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={submitting}
          rows={5}
          maxLength={maxCommentChars}
          placeholder={`Scrie pe scurt cum a fost experiența ta.
• Ce ți-a plăcut?
• Ce am putea îmbunătăți?
• Ai recomanda?`}
          className={[
            "w-full p-3 rounded-xl transition resize-none",
            "focus:outline-none focus:ring-4",
            showCommentError
              ? "bg-gray-900/60 text-white border border-red-500 focus:ring-red-500/20"
              : "bg-gray-900/60 text-white border border-white/10 focus:ring-blue-500/15 focus:border-blue-500/60",
          ].join(" ")}
        />

        <div className="flex justify-between mt-1 text-xs">
          <span className={showCommentError ? "text-red-400" : "text-white/50"}>
            {showCommentError ? "Review-ul este obligatoriu." : "Scrie câteva cuvinte despre experiența ta."}
          </span>

          <span className="text-white/55">
            {comment.length}/{maxCommentChars}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-semibold">Poze (opțional)</div>
        <div className="text-xs text-white/60 mt-1">
          Maxim {MAX_FILES} imagini. Selectate: {pickedFiles.length}/{MAX_FILES}
        </div>

        <input
          id="review_files"
          type="file"
          multiple
          accept="image/*"
          disabled={submitting || pickedFiles.length >= MAX_FILES}
          onChange={(e) => onPickFiles(e.target.files)}
          className="mt-3 w-full p-3 rounded-xl bg-gray-900/60 text-white border border-white/10 focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15 transition"
        />

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {previews.map((src, idx) => (
              <div
                key={src}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30"
              >
                <img
                  src={src}
                  alt="preview"
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePicked(idx)}
                  className="absolute top-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-xs text-white hover:bg-black/80"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}