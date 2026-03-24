"use client";

export function AdminContactNotice({
  notice,
}: {
  notice: { type: "success" | "error"; text: string } | null;
}) {
  if (!notice) return null;

  return (
    <div
      className={`rounded-xl px-4 py-3 text-sm ${
        notice.type === "success"
          ? "border border-green-500/30 bg-green-500/10 text-green-200"
          : "border border-red-500/30 bg-red-500/10 text-red-200"
      }`}
    >
      {notice.text}
    </div>
  );
}