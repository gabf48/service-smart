import type { Notice, ReviewRow } from "../_types/reviews";

type SetNotice = (notice: Notice) => void;
type SetReviews = React.Dispatch<React.SetStateAction<ReviewRow[]>>;

export function applyApprovalLocally(
  setReviews: SetReviews,
  ids: string[],
  value: boolean
) {
  setReviews((prev) =>
    prev.map((r) => (ids.includes(r.id) ? { ...r, is_approved: value } : r))
  );
}

export function removeReviewsLocally(setReviews: SetReviews, ids: string[]) {
  setReviews((prev) => prev.filter((r) => !ids.includes(r.id)));
}

export function setMutationError(setNotice: SetNotice, message: string) {
  setNotice({ type: "error", text: message });
}

export function setMutationSuccess(setNotice: SetNotice, message: string) {
  setNotice({ type: "success", text: message });
}