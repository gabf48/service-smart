"use client";

export function ReviewFilesField({
  MAX_FILES,
  pickedFiles,
  previews,
  submitting,
  onPickFiles,
  removePicked,
}: {
  MAX_FILES: number;
  pickedFiles: File[];
  previews: string[];
  submitting: boolean;
  onPickFiles: (list: FileList | null) => void;
  removePicked: (idx: number) => void;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
      data-testid="review-files-section"
    >
      <div className="text-sm font-semibold">Poze (opțional)</div>
      <div className="mt-1 text-xs text-white/60" data-testid="review-files-meta">
        Maxim {MAX_FILES} imagini. Selectate: {pickedFiles.length}/{MAX_FILES}
      </div>

      <input
        id="review-files"
        name="review-files"
        type="file"
        multiple
        accept="image/*"
        disabled={submitting || pickedFiles.length >= MAX_FILES}
        onChange={(e) => onPickFiles(e.target.files)}
        data-testid="review-input-files"
        className="mt-3 w-full rounded-xl border border-white/10 bg-gray-900/60 p-3 text-white transition focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
      />

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2" data-testid="review-files-previews">
          {previews.map((src, idx) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30"
              data-testid="review-preview-item"
            >
              <img
                src={src}
                alt={`preview-${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="h-24 w-full object-cover"
                data-testid="review-preview-image"
              />
              <button
                type="button"
                onClick={() => removePicked(idx)}
                className="absolute right-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-xs text-white hover:bg-black/80"
                data-testid="review-preview-remove"
                aria-label={`Șterge poza ${idx + 1}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}