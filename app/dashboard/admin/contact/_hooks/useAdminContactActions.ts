"use client";

import { useState } from "react";
import {
  exportContactRequestsCsv,
  updateContactRequestStatus,
} from "../_utils/adminContactApi";
import type { ContactRequestRow } from "../_types/contact";

export function useAdminContactActions(
  filteredItems: ContactRequestRow[],
  selectedItem: ContactRequestRow | null,
  setItems: React.Dispatch<React.SetStateAction<ContactRequestRow[]>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<ContactRequestRow | null>>,
  setNotice: React.Dispatch<
    React.SetStateAction<{ type: "success" | "error"; text: string } | null>
  >
) {
  const [busyId, setBusyId] = useState<string | null>(null);

  const toggleResolved = async (item: ContactRequestRow) => {
    const nextStatus = item.status === "open" ? "resolved" : "open";
    setBusyId(item.id);

    const { error } = await updateContactRequestStatus(item.id, nextStatus);

    if (error) {
      setBusyId(null);
      setNotice({
        type: "error",
        text: "Nu s-a putut actualiza statusul cererii.",
      });
      return;
    }

    setItems((prev) =>
      prev.map((x) =>
        x.id === item.id ? { ...x, status: nextStatus } : x
      )
    );

    if (selectedItem?.id === item.id) {
      setSelectedItem({ ...item, status: nextStatus });
    }

    setBusyId(null);
    setNotice({
      type: "success",
      text:
        nextStatus === "resolved"
          ? "Cererea a fost marcată ca rezolvată."
          : "Cererea a fost redeschisă.",
    });
  };

  const handleExportCsv = () => {
    exportContactRequestsCsv(filteredItems);
  };

  return {
    busyId,
    toggleResolved,
    handleExportCsv,
  };
}