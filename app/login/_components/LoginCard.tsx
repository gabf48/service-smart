"use client";

export function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-sm animate-auth-in rounded-2xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md"
      data-testid="login-card"
    >
      <h1 className="text-3xl font-bold text-white" data-testid="login-title">
        Login
      </h1>

      <p className="mt-1 text-sm text-white/70">Intră în contul tău.</p>

      {children}

      <style jsx>{`
        .animate-auth-in {
          animation: authIn 220ms ease-out both;
        }
        @keyframes authIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}