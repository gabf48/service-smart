"use client";

import { useState } from "react";
import type { ReviewRow } from "../_types/reviews";
import { AdminReviewCardHeader } from "./AdminReviewCardHeader";
import { AdminReviewCardActions } from "./AdminReviewCardActions";
import { AdminReviewCardAttachments } from "./AdminReviewCardAttachments";
import { AttachmentPreviewModal } from "./AttachmentPreviewModal";

export function AdminReviewCard({
  review,
  busy,
  selected,
  onToggleSelected,
  onApprove,
  onMoveToPending,
  onReject,
}: {
  review: ReviewRow;
  busy: boolean;
  selected: boolean;
  onToggleSelected: (id: string) => void;
  onApprove: (id: string) => void;
  onMoveToPending: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl shadow-black/30 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <AdminReviewCardHeader
              review={review}
              selected={selected}
              onToggleSelected={onToggleSelected}
            />

            <AdminReviewCardActions
              approved={review.is_approved === true}
              busy={busy}
              id={review.id}
              onApprove={onApprove}
              onMoveToPending={onMoveToPending}
              onReject={onReject}
            />
          </div>

          <AdminReviewCardAttachments
            attachments={Array.isArray(review.attachments) ? review.attachments : []}
            onPreview={setPreviewUrl}
          />
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <AttachmentPreviewModal
        open={!!previewUrl}
        imageUrl={previewUrl}
        onClose={() => setPreviewUrl(null)}
      />
    </>
  );
}