import "./globals.css";
import AppVersion from "@/components/AppVersion";
import { AuthProvider } from "@/app/context/AuthContext";
import type { Metadata } from "next";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: {
    default: "Service Smart",
    template: "%s | Service Smart",
  },
  description: "Service Smart",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="space-bg min-h-screen flex flex-col">
        <AppVersion />
        <AuthProvider>
         <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}