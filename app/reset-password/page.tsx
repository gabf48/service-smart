"use client";

import { ResetPasswordCard } from "./_components/ResetPasswordCard";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";
import { ResetPasswordLoading } from "./_components/ResetPasswordLoading";
import { useResetPassword } from "./_hooks/useResetPassword";

export default function ResetPasswordPage() {
  const form = useResetPassword();

  if (form.loading) {
    return <ResetPasswordLoading />;
  }

  return (
    <div className="flex h-dvh items-center justify-center bg-black p-6">
      <ResetPasswordCard>
        <ResetPasswordForm
          password={form.password}
          setPassword={form.setPassword}
          confirmPassword={form.confirmPassword}
          setConfirmPassword={form.setConfirmPassword}
          canReset={form.canReset}
          saving={form.saving}
          errorMsg={form.errorMsg}
          successMsg={form.successMsg}
          onSubmit={form.handleReset}
        />
      </ResetPasswordCard>
    </div>
  );
}