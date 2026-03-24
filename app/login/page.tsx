"use client";

import { LoginCard } from "./_components/LoginCard";
import { LoginForm } from "./_components/LoginForm";
import { useLoginForm } from "./_hooks/useLoginForm";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMsg,
    handleLogin,
  } = useLoginForm();

  return (
    <div
      className="space-bg flex h-dvh items-center justify-center overflow-hidden p-6"
      data-testid="login-page"
    >
      <LoginCard>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          errorMsg={errorMsg}
          onSubmit={handleLogin}
        />
      </LoginCard>
    </div>
  );
}