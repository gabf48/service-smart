"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReviewRow, ReviewsTab, SortMode } from "../_types/reviews";
import {
  filterReviews,
  sortReviews,
  paginateReviews,
  getAverageRating,
} from "../_utils/reviews";

export function useAdminReviewsFilters(reviews: ReviewRow[]) {
  const [tab, setTab] = useState<ReviewsTab>("pending");
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const pending = useMemo(
    () => reviews.filter((r) => r.is_approved !== true),
    [reviews]
  );

  const approved = useMemo(
    () => reviews.filter((r) => r.is_approved === true),
    [reviews]
  );

  const baseList = tab === "pending" ? pending : approved;
  const filtered = useMemo(
    () => filterReviews(baseList, search, ratingFilter),
    [baseList, search, ratingFilter]
  );
  const sorted = useMemo(() => sortReviews(filtered, sortMode), [filtered, sortMode]);

  const { totalPages, list } = useMemo(
    () => paginateReviews(sorted, page),
    [sorted, page]
  );

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [tab, search, ratingFilter, sortMode]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllVisible = () => setSelectedIds(list.map((r) => r.id));
  const clearSelection = () => setSelectedIds([]);

  const stats = {
    total: reviews.length,
    pending: pending.length,
    approved: approved.length,
    averageRating: getAverageRating(reviews),
  };

  return {
    tab,
    setTab,
    search,
    setSearch,
    ratingFilter,
    setRatingFilter,
    sortMode,
    setSortMode,
    page,
    setPage,
    totalPages,
    totalFiltered: sorted.length,
    pending,
    approved,
    list,
    selectedIds,
    toggleSelected,
    selectAllVisible,
    clearSelection,
    stats,
  };
}