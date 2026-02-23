import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="space-bg min-h-screen">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}