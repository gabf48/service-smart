"use client";

import type { SelectedFile } from "../_hooks/useContactFiles";

type Props = {
  files: SelectedFile[];
  onRemove: (id: string) => void;
  loading: boolean;
};

export function ContactFilePreview({ files, onRemove, loading }: Props) {
  if (!files.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {files.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border border-white/10 bg-black/30"
        >
          <div className="aspect-video w-full bg-black/40">
            {item.kind === "image" ? (
              <img
                src={item.previewUrl}
                className="h-full w-full object-cover"
              />
            ) : item.kind === "video" ? (
              <video
                src={item.previewUrl}
                className="h-full w-full object-cover"
                controls
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/60">
                Fișier
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="min-w-0">
              <div className="truncate text-sm">{item.file.name}</div>
              <div className="text-xs text-white/50">
                {(item.file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              disabled={loading}
              className="rounded-lg bg-white/10 px-3 py-1 text-xs hover:bg-white/15 disabled:opacity-50"
            >
              Șterge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}