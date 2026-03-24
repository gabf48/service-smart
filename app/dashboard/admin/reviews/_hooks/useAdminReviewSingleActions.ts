"use client";

import type { Notice, ReviewRow } from "../_types/reviews";
import {
  deleteReviewApi,
  updateReviewApproved,
} from "../_utils/reviewsApi";
import {
  applyApprovalLocally,
  removeReviewsLocally,
  setMutationError,
  setMutationSuccess,
} from "../_utils/reviewMutationHelpers";

type SetNotice = (notice: Notice) => void;
type SetBusyId = (id: string | null) => void;
type SetReviews = React.Dispatch<React.SetStateAction<ReviewRow[]>>;

export function useAdminReviewSingleActions(
  reviews: ReviewRow[],
  busyId: string | null,
  setBusyId: SetBusyId,
  setNotice: SetNotice,
  setReviews: SetReviews
) {
  const setApproved = async (id: string, value: boolean) => {
    if (busyId) return false;

    setBusyId(id);
    setNotice(null);
    applyApprovalLocally(setReviews, [id], value);

    const { error } = await updateReviewApproved(id, value);
    setBusyId(null);

    if (error) {
      applyApprovalLocally(setReviews, [id], !value);
      setMutationError(setNotice, error.message);
      return false;
    }

    setMutationSuccess(
      setNotice,
      value ? "Review aprobat." : "Mutat în pending."
    );
    return true;
  };

  const deleteReview = async (id: string) => {
    if (busyId) return false;

    setBusyId(id);
    setNotice(null);

    const previous = reviews;
    removeReviewsLocally(setReviews, [id]);

    const { error } = await deleteReviewApi(id);
    setBusyId(null);

    if (error) {
      setReviews(previous);
      setMutationError(setNotice, error.message);
      return false;
    }

    setMutationSuccess(setNotice, "Review șters.");
    return true;
  };

  return { setApproved, deleteReview };
}