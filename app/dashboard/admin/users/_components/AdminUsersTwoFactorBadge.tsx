"use client";

export function AdminUsersTwoFactorBadge({
  enabled,
}: {
  enabled: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        enabled
          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20"
          : "bg-white/10 text-white/65 ring-1 ring-white/10",
      ].join(" ")}
    >
      {enabled ? "Activat" : "Nu"}
    </span>
  );
}