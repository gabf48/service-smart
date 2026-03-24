"use client";

import { useEffect } from "react";
import { fetchReviewsApi } from "../_utils/reviewsApi";
import { useAdminReviewsMutations } from "./useAdminReviewsMutations";
import { useAdminReviewsNotices } from "./useAdminReviewsNotices";
import { useAdminReviewsState } from "./useAdminReviewsState";

export function useAdminReviewsData() {
  const {
    loading,
    setLoading,
    busyId,
    setBusyId,
    notice,
    setNotice,
    reviews,
    setReviews,
  } = useAdminReviewsState();

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await fetchReviewsApi();
    setLoading(false);

    if (error) {
      setNotice({ type: "error", text: error.message });
      setReviews([]);
      return;
    }

    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useAdminReviewsNotices(notice, setNotice);

  const mutations = useAdminReviewsMutations(
    reviews,
    busyId,
    setBusyId,
    setNotice,
    setReviews
  );

  return {
    loading,
    busyId,
    notice,
    setNotice,
    reviews,
    setReviews,
    fetchReviews,
    ...mutations,
  };
}