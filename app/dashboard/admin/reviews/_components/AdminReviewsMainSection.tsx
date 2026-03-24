"use client";

import { AdminReviewsList } from "./AdminReviewsList";
import { AdminReviewsPagination } from "./AdminReviewsPagination";
import type { AdminReviewsContentProps } from "../_types/reviewContent";

export function AdminReviewsMainSection({
  loading,
  reviews,
  tab,
  busyId,
  selectedIds,
  onToggleSelected,
  onApprove,
  onMoveToPending,
  onReject,
  page,
  setPage,
  totalPages,
}: Pick<
  AdminReviewsContentProps,
  | "loading"
  | "reviews"
  | "tab"
  | "busyId"
  | "selectedIds"
  | "onToggleSelected"
  | "onApprove"
  | "onMoveToPending"
  | "onReject"
  | "page"
  | "setPage"
  | "totalPages"
>) {
  return (
    <>
      <div className="mt-8" data-testid="admin-reviews-list-section">
        <AdminReviewsList
          loading={loading}
          reviews={reviews}
          tab={tab}
          busyId={busyId}
          selectedIds={selectedIds}
          onToggleSelected={onToggleSelected}
          onApprove={onApprove}
          onMoveToPending={onMoveToPending}
          onReject={onReject}
        />
      </div>

      <AdminReviewsPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
}