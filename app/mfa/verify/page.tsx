"use client";

import { MfaVerifyForm } from "./_components/MfaVerifyForm";
import { useMfaVerify } from "./_hooks/useMfaVerify";

export default function MfaVerifyPage() {
  const verify = useMfaVerify();

  return (
    <div className="flex min-h-dvh items-center justify-center text-white">
      <MfaVerifyForm
        code={verify.code}
        setCode={verify.setCode}
        error={verify.error}
        loading={verify.loading}
        onSubmit={verify.handleSubmit}
        onLogout={verify.handleLogout}
      />
    </div>
  );
}