"use client";

import type { Notice, ReviewRow } from "../_types/reviews";
import { useAdminReviewBulkActions } from "./useAdminReviewBulkActions";
import { useAdminReviewSingleActions } from "./useAdminReviewSingleActions";

type SetNotice = (notice: Notice) => void;
type SetBusyId = (id: string | null) => void;
type SetReviews = React.Dispatch<React.SetStateAction<ReviewRow[]>>;

export function useAdminReviewsMutations(
  reviews: ReviewRow[],
  busyId: string | null,
  setBusyId: SetBusyId,
  setNotice: SetNotice,
  setReviews: SetReviews
) {
  const single = useAdminReviewSingleActions(
    reviews,
    busyId,
    setBusyId,
    setNotice,
    setReviews
  );

  const bulk = useAdminReviewBulkActions(
    reviews,
    setNotice,
    setReviews
  );

  return {
    ...single,
    ...bulk,
  };
}