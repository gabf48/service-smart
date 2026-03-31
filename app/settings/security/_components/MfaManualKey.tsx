"use client";

export function MfaManualKey({
  secret,
  showSecret,
  onToggleSecret,
  onCopy,
}: {
  secret: string;
  showSecret: boolean;
  onToggleSecret: () => void;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="text-sm text-white/60">Cheie manuală</div>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
          {showSecret ? (
            <span className="break-all">{secret}</span>
          ) : (
            <span>{"•".repeat(20)}</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onToggleSecret}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
          >
            {showSecret ? "Ascunde" : "Arată"}
          </button>

          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
          >
            Copiază
          </button>
        </div>
      </div>
    </div>
  );
}