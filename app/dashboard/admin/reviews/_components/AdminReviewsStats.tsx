"use client";

export function AdminReviewsStats({
  total,
  pending,
  approved,
  averageRating,
}: {
  total: number;
  pending: number;
  approved: number;
  averageRating: number;
}) {
  const items = [
    { label: "Total reviews", value: total },
    { label: "Pending", value: pending },
    { label: "Approved", value: approved },
    { label: "Average rating", value: averageRating.toFixed(1) },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5"
        >
          <div className="text-sm text-white/60">{item.label}</div>
          <div className="mt-2 text-2xl font-bold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}