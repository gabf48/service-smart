import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/context/AuthContext";
import type { Metadata } from "next";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="space-bg min-h-screen flex flex-col">
          <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}