"use client";

export function AdminUsersRoleBadge({
  role,
}: {
  role: "admin" | "user";
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        role === "admin"
          ? "bg-purple-500/20 text-purple-300"
          : "bg-white/10 text-white"
      }`}
    >
      {role}
    </span>
  );
}