import "./globals.css";
import AppVersion from "@/components/AppVersion";
import { AuthProvider } from "@/app/context/AuthContext";
import type { Metadata } from "next";
import LayoutShell from "@/components/LayoutShell";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Service Smart",
    template: "%s | Service Smart",
  },
  description: "Reparații laptop și PC în Cluj-Napoca. Rapid, corect și fără complicații.",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-65W4QTQDY7');
          `}
        </Script>
      </head>

      <body className="space-bg min-h-screen flex flex-col">
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}