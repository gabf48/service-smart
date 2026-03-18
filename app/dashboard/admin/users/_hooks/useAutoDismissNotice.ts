"use client";

import { useEffect } from "react";

export function useAutoDismissNotice(
  notice: { type: "success" | "error"; text: string } | null,
  clearNotice: () => void,
  delay = 3000
) {
  useEffect(() => {
    if (!notice) return;

    const t = setTimeout(() => clearNotice(), delay);
    return () => clearTimeout(t);
  }, [notice, clearNotice, delay]);
}