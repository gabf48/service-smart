"use client";

export function Footer({
  phoneDisplay,
  onClose,
}: {
  phoneDisplay: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 p-5">
      <div className="text-sm text-white/70">Preferi rapid? {phoneDisplay}</div>

      <button
        onClick={onClose}
        className="rounded-xl bg-white/10 px-4 py-2 transition hover:bg-white/20"
      >
        Închide
      </button>
    </div>
  );
}