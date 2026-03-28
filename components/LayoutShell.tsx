"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppVersion from "@/components/AppVersion";
import { useAuth } from "@/app/context/useAuth";
import { AdminReviewNotifier } from "@/components/admin-review-notifier/AdminReviewNotifier";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role } = useAuth();

  const hideChrome = pathname === "/reset-password";

  return (
    <>
      {!hideChrome && <Header />}

      {role === "admin" && <AdminReviewNotifier />}

      <main className="flex-1">{children}</main>

      {!hideChrome && <Footer />}
      <AppVersion />
    </>
  );
}