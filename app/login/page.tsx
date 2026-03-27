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
    forgotMsg,
    forgotError,
    handleLogin,
    handleForgotPassword,
  } = useLoginForm();

  return (
    <div
      className="space-bg flex min-h-dvh items-center justify-center p-6"
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
          forgotMsg={forgotMsg}
          forgotError={forgotError}
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
        />
      </LoginCard>
    </div>
  );
}