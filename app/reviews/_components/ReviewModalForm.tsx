"use client";

import { ReviewRatingSection } from "./ReviewRatingSection";
import { ReviewNameField } from "./ReviewNameField";
import { ReviewCommentField } from "./ReviewCommentField";
import { ReviewFilesField } from "./ReviewFilesField";

export function ReviewModalForm({
  submitting,
  isLogged,
  computedLockedName,
  rating,
  setRating,
  displayName,
  setDisplayName,
  nameError,
  setNameError,
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
  nameError?: string;
  setNameError: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;
  maxCommentChars: number;
  MAX_FILES: number;
  pickedFiles: File[];
  previews: string[];
  onPickFiles: (list: FileList | null) => void;
  removePicked: (idx: number) => void;
}) {
  return (
    <div
      className="space-y-4 p-6 sm:p-7"
      data-testid="review-modal-form"
    >
      <ReviewRatingSection
        rating={rating}
        setRating={setRating}
        submitting={submitting}
      />

      <ReviewNameField
        isLogged={isLogged}
        computedLockedName={computedLockedName}
        displayName={displayName}
        setDisplayName={setDisplayName}
        submitting={submitting}
        nameError={nameError}
        setNameError={setNameError}
      />

      <ReviewCommentField
        comment={comment}
        setComment={setComment}
        submitting={submitting}
        maxCommentChars={maxCommentChars}
      />

      <ReviewFilesField
        MAX_FILES={MAX_FILES}
        pickedFiles={pickedFiles}
        previews={previews}
        submitting={submitting}
        onPickFiles={onPickFiles}
        removePicked={removePicked}
      />
    </div>
  );
}