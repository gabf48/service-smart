"use client";

import { useEffect, useMemo, useState } from "react";

export type SelectedFile = {
  id: string;
  file: File;
  previewUrl: string;
  kind: "image" | "video" | "other";
};

function getFileKind(file: File): "image" | "video" | "other" {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return "other";
}

export function useContactFiles() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [selectedFiles]);

  const files = useMemo(() => {
    if (!selectedFiles.length) return null;

    const dt = new DataTransfer();
    selectedFiles.forEach((item) => dt.items.add(item.file));
    return dt.files;
  }, [selectedFiles]);

  const setFiles = (fileList: FileList | null) => {
    selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));

    if (!fileList || fileList.length === 0) {
      setSelectedFiles([]);
      return;
    }

    const mapped = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      kind: getFileKind(file),
    }));

    setSelectedFiles(mapped);
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);

      const next = prev.filter((item) => item.id !== id);
      const fileEl = document.getElementById("contact_files") as HTMLInputElement | null;

      if (fileEl) {
        const dt = new DataTransfer();
        next.forEach((item) => dt.items.add(item.file));
        fileEl.files = dt.files;
      }

      return next;
    });
  };

  const resetFiles = () => {
    selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setSelectedFiles([]);

    const fileEl = document.getElementById("contact_files") as HTMLInputElement | null;
    if (fileEl) fileEl.value = "";
  };

  return { files, selectedFiles, setFiles, removeFile, resetFiles };
}