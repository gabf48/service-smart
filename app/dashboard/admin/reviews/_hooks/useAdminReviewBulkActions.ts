"use client";

import type { Notice, ReviewRow } from "../_types/reviews";
import {
  bulkDeleteReviews,
  bulkUpdateReviewsApproved,
} from "../_utils/reviewsApi";
import {
  applyApprovalLocally,
  removeReviewsLocally,
  setMutationError,
  setMutationSuccess,
} from "../_utils/reviewMutationHelpers";

type SetNotice = (notice: Notice) => void;
type SetReviews = React.Dispatch<React.SetStateAction<ReviewRow[]>>;

export function useAdminReviewBulkActions(
  reviews: ReviewRow[],
  setNotice: SetNotice,
  setReviews: SetReviews
) {
  const bulkApprove = async (ids: string[]) => {
    if (!ids.length) return false;

    const previous = reviews;
    applyApprovalLocally(setReviews, ids, true);

    const { error } = await bulkUpdateReviewsApproved(ids, true);
    if (error) {
      setReviews(previous);
      setMutationError(setNotice, error.message);
      return false;
    }

    setMutationSuccess(setNotice, `${ids.length} review-uri aprobate.`);
    return true;
  };

  const bulkMoveToPending = async (ids: string[]) => {
    if (!ids.length) return false;

    const previous = reviews;
    applyApprovalLocally(setReviews, ids, false);

    const { error } = await bulkUpdateReviewsApproved(ids, false);
    if (error) {
      setReviews(previous);
      setMutationError(setNotice, error.message);
      return false;
    }

    setMutationSuccess(
      setNotice,
      `${ids.length} review-uri mutate în pending.`
    );
    return true;
  };

  const bulkDelete = async (ids: string[]) => {
    if (!ids.length) return false;

    const previous = reviews;
    removeReviewsLocally(setReviews, ids);

    const { error } = await bulkDeleteReviews(ids);
    if (error) {
      setReviews(previous);
      setMutationError(setNotice, error.message);
      return false;
    }

    setMutationSuccess(setNotice, `${ids.length} review-uri șterse.`);
    return true;
  };

  return { bulkApprove, bulkMoveToPending, bulkDelete };
}