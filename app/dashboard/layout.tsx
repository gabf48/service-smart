import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="font-bold text-lg">Dashboard</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard/admin">Admin</Link>
          <Link href="/dashboard/user">User</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
