export function fmtReviewDate(iso?: string | null) {
  if (!iso) return "";

  const d = new Date(iso);
  return d.toLocaleString("ro-RO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}