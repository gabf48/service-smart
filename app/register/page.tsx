"use client";

import { RegisterCard } from "./_components/RegisterCard";
import { RegisterForm } from "./_components/RegisterForm";
import { useRegisterForm } from "./_hooks/useRegisterForm";

export default function RegisterPage() {
  const form = useRegisterForm();

  return (
    <div className="space-bg relative isolate flex min-h-dvh items-start justify-center p-6 pb-24">
      <RegisterCard errorMsg={form.errorMsg}>
        <RegisterForm form={form} />
      </RegisterCard>
    </div>
  );
}