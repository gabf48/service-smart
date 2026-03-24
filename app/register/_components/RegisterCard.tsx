"use client";

export function RegisterCard({
  errorMsg,
  children,
}: {
  errorMsg: string | null;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-full max-w-sm rounded-2xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md animate-auth-in ${
        errorMsg ? "shake" : ""
      }`}
    >
      <h1 className="text-3xl font-bold text-white">Cont nou</h1>
      <p className="mt-1 text-sm text-white/70">Creează un cont nou.</p>

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
        .shake {
          animation: shake 260ms ease-in-out;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}