"use client";

import { useEffect, useState } from "react";
import { fetchContactRequests } from "../_utils/adminContactApi";
import type { ContactRequestRow } from "../_types/contact";
import { useAdminContactFilters } from "./useAdminContactFilters";
import { useAdminContactSelection } from "./useAdminContactSelection";
import { useAdminContactActions } from "./useAdminContactActions";

export function useAdminContactPage() {
  const [items, setItems] = useState<ContactRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContactRequestRow | null>(null);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadItems = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await fetchContactRequests();

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const filters = useAdminContactFilters(items);

  const selection = useAdminContactSelection(
    filters.filteredItems,
    setItems,
    setNotice
  );

  const actions = useAdminContactActions(
    filters.filteredItems,
    selectedItem,
    setItems,
    setSelectedItem,
    setNotice
  );

  return {
    loading,
    errorMsg,
    notice,
    items,
    selectedItem,
    setSelectedItem,
    loadItems,
    ...filters,
    ...selection,
    ...actions,
  };
}