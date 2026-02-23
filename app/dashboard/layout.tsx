"use client";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>; // nu include Header sau Sidebar aici
}
