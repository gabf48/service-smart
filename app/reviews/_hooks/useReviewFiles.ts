"use client";

import { useEffect, useState } from "react";
import { MAX_FILES } from "../_utils/reviewFormData";
import {
  buildPreviewUrls,
  cleanupPreviewUrls,
} from "../_utils/reviewFilePreview";

export function useReviewFiles() {
  const [pickedFiles, setPickedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => cleanupPreviewUrls(previews);
  }, [previews]);

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;

    const incoming = Array.from(list).filter((file) =>
      file.type.startsWith("image/")
    );

    const nextFiles = [...pickedFiles, ...incoming].slice(0, MAX_FILES);

    cleanupPreviewUrls(previews);
    setPickedFiles(nextFiles);
    setPreviews(buildPreviewUrls(nextFiles));

    const el = document.getElementById("review_files") as HTMLInputElement | null;
    if (el) el.value = "";
  };

  const removePicked = (idx: number) => {
    const nextFiles = pickedFiles.filter((_, i) => i !== idx);
    cleanupPreviewUrls(previews);
    setPickedFiles(nextFiles);
    setPreviews(buildPreviewUrls(nextFiles));
  };

  const resetFiles = () => {
    const el = document.getElementById("review_files") as HTMLInputElement | null;
    if (el) el.value = "";

    setPickedFiles([]);
    cleanupPreviewUrls(previews);
    setPreviews([]);
  };

  return {
    pickedFiles,
    previews,
    onPickFiles,
    removePicked,
    resetFiles,
  };
}