"use client";

export function ReviewCommentField({
  comment,
  setComment,
  submitting,
  maxCommentChars,
}: {
  comment: string;
  setComment: (v: string) => void;
  submitting: boolean;
  maxCommentChars: number;
}) {
  const showCommentError = !comment.trim();

  return (
    <div data-testid="review-comment-section">
      <label
        htmlFor="review-comment"
        className="mb-1 block text-sm text-white/70"
      >
        Review (obligatoriu)
      </label>

      <textarea
        id="review-comment"
        name="review-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={submitting}
        rows={5}
        maxLength={maxCommentChars}
        aria-invalid={showCommentError}
        data-testid="review-input-comment"
        placeholder={`Scrie pe scurt cum a fost experiența ta.
• Ce ți-a plăcut?
• Ce am putea îmbunătăți?
• Ai recomanda?`}
        className={[
          "w-full resize-none rounded-xl p-3 transition",
          "focus:outline-none focus:ring-4",
          showCommentError
            ? "border border-red-500 bg-gray-900/60 text-white focus:ring-red-500/20"
            : "border border-white/10 bg-gray-900/60 text-white focus:border-blue-500/60 focus:ring-blue-500/15",
        ].join(" ")}
      />

      <div className="mt-1 flex justify-between text-xs">
        <span
          className={showCommentError ? "text-red-400" : "text-white/50"}
          data-testid="review-comment-helper"
          aria-live="polite"
        >
          {showCommentError
            ? "Review-ul este obligatoriu."
            : "Scrie câteva cuvinte despre experiența ta."}
        </span>

        <span className="text-white/55" data-testid="review-comment-counter">
          {comment.length}/{maxCommentChars}
        </span>
      </div>
    </div>
  );
}