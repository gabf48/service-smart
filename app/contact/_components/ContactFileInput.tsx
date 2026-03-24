"use client";

import type { SelectedFile } from "../_hooks/useContactFiles";
import { validateFiles } from "../_utils/fileValidation";
import { ContactFileDropzone } from "./ContactFileDropzone";
import { ContactFilePreview } from "./ContactFilePreview";

type Props = {
  onChange: (files: FileList | null) => void;
  selectedFiles: SelectedFile[];
  onRemove: (id: string) => void;
  loading: boolean;
  setNotice?: (v: { type: "success" | "error"; text: string } | null) => void;
};

export function ContactFileInput({
  onChange,
  selectedFiles,
  onRemove,
  loading,
  setNotice,
}: Props) {
  const handleSelect = (files: FileList | null) => {
    const error = validateFiles(files);

    if (error) {
      setNotice?.({ type: "error", text: error });
      onChange(null);
      return;
    }

    setNotice?.(null);
    onChange(files);
  };

  return (
    <div className="flex flex-col gap-3">
      <ContactFileDropzone loading={loading} onSelect={handleSelect} />

      <ContactFilePreview
        files={selectedFiles}
        onRemove={onRemove}
        loading={loading}
      />
    </div>
  );
}