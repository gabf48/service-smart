import "./globals.css";
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="space-bg min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          
          {/* main content */}
          <main className="flex-1">{children}</main>

          {/* footer fix */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}