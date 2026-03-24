"use client";

import { useState } from "react";
import { bulkUpdateContactRequestStatus } from "../_utils/adminContactApi";
import type { ContactRequestRow } from "../_types/contact";

export function useAdminContactSelection(
  filteredItems: ContactRequestRow[],
  setItems: React.Dispatch<React.SetStateAction<ContactRequestRow[]>>,
  setNotice: React.Dispatch<
    React.SetStateAction<{ type: "success" | "error"; text: string } | null>
  >
) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllVisible = () => {
    setSelectedIds(filteredItems.map((x) => x.id));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const bulkUpdateStatus = async (status: "open" | "resolved") => {
    if (!selectedIds.length) return;

    const { error } = await bulkUpdateContactRequestStatus(selectedIds, status);

    if (error) {
      setNotice({
        type: "error",
        text:
          status === "resolved"
            ? "Nu s-au putut actualiza cererile."
            : "Nu s-au putut redeschide cererile.",
      });
      return;
    }

    setItems((prev) =>
      prev.map((x) =>
        selectedIds.includes(x.id) ? { ...x, status } : x
      )
    );

    setSelectedIds([]);

    setNotice({
      type: "success",
      text:
        status === "resolved"
          ? "Cererile selectate au fost marcate ca rezolvate."
          : "Cererile selectate au fost redeschise.",
    });
  };

  const bulkMarkResolved = async () => bulkUpdateStatus("resolved");
  const bulkReopen = async () => bulkUpdateStatus("open");

  return {
    selectedIds,
    toggleSelect,
    selectAllVisible,
    clearSelection,
    bulkMarkResolved,
    bulkReopen,
  };
}