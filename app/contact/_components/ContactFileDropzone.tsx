"use client";

type Props = {
  loading: boolean;
  onSelect: (files: FileList | null) => void;
};

export function ContactFileDropzone({ loading, onSelect }: Props) {
  return (
    <>
      <label
        htmlFor="contact_files"
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-gray-900/40 p-4 transition ${
          loading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-blue-500/50 hover:bg-gray-900/60"
        }`}
      >
        <span className="text-sm text-white/70">
          Trage fișiere aici sau apasă pentru upload
        </span>

        <span className="text-xs text-white/40">
          Imagini / video • max 5 fișiere • max 10MB
        </span>
      </label>

      <input
        id="contact_files"
        type="file"
        multiple
        accept="image/*,video/*"
        disabled={loading}
        onChange={(e) => onSelect(e.target.files)}
        className="hidden"
      />
    </>
  );
}