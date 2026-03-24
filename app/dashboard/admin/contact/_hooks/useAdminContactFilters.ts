"use client";

import { useMemo, useState } from "react";
import type {
  ContactReasonFilter,
  ContactRequestRow,
  ContactStatusFilter,
} from "../_types/contact";

export function useAdminContactFilters(items: ContactRequestRow[]) {
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] =
    useState<ContactReasonFilter>("all");
  const [statusFilter, setStatusFilter] =
    useState<ContactStatusFilter>("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchesReason =
        reasonFilter === "all" ? true : item.reason === reasonFilter;

      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchesSearch && matchesReason && matchesStatus;
    });
  }, [items, search, reasonFilter, statusFilter]);

  return {
    search,
    setSearch,
    reasonFilter,
    setReasonFilter,
    statusFilter,
    setStatusFilter,
    filteredItems,
  };
}