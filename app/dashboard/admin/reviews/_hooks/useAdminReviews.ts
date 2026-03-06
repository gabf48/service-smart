// app/dashboard/admin/reviews/_hooks/useAdminReviews.ts
"use client";

import { useState } from "react";
import { exportReviewsCsv } from "../_utils/exportCsv";
import { useAdminReviewsData } from "./useAdminReviewsData";
import { useAdminReviewsFilters } from "./useAdminReviewsFilters";
import { useAdminReviewsRealtime } from "./useAdminReviewsRealtime";

export function useAdminReviews() {
  const data = useAdminReviewsData();
  const filters = useAdminReviewsFilters(data.reviews);

  const realtime = useAdminReviewsRealtime({
    reviews: data.reviews,
    setReviews: data.setReviews,
    setNotice: data.setNotice,
    tab: filters.tab,
  });

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const bulkApprove = async (ids: string[]) => {
    const ok = await data.bulkApprove(ids);
    return ok;
  };

  const bulkMoveToPending = async (ids: string[]) => {
    const ok = await data.bulkMoveToPending(ids);
    return ok;
  };

  const bulkDelete = async (ids: string[]) => {
    const ok = await data.bulkDelete(ids);
    return ok;
  };

  const exportCsv = () => {
    exportReviewsCsv(
      filters.tab === "pending" ? filters.pending : filters.approved,
      filters.tab
    );
  };

  return {
    // data
    loading: data.loading,
    busyId: data.busyId,
    notice: data.notice,
    setNotice: data.setNotice,
    reviews: data.reviews,
    setReviews: data.setReviews,
    fetchReviews: data.fetchReviews,
    setApproved: data.setApproved,
    deleteReview: data.deleteReview,

    // bulk
    bulkApprove,
    bulkMoveToPending,
    bulkDelete,

    // realtime
    newPendingCount: realtime.newPendingCount,

    // filters
    tab: filters.tab,
    setTab: filters.setTab,
    search: filters.search,
    setSearch: filters.setSearch,
    ratingFilter: filters.ratingFilter,
    setRatingFilter: filters.setRatingFilter,
    sortMode: filters.sortMode,
    setSortMode: filters.setSortMode,
    page: filters.page,
    setPage: filters.setPage,
    totalPages: filters.totalPages,
    totalFiltered: filters.totalFiltered,

    pending: filters.pending,
    approved: filters.approved,
    list: filters.list,

    // selection
    selectedIds: filters.selectedIds,
    toggleSelected: filters.toggleSelected,
    selectAllVisible: filters.selectAllVisible,
    clearSelection: filters.clearSelection,

    // delete modal
    confirmDeleteId,
    setConfirmDeleteId,

    // export
    exportCsv,

    // stats
    stats: filters.stats,
  };
}