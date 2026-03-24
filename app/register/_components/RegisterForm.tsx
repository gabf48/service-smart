"use client";

import PasswordInput from "@/components/PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { RegisterTermsField } from "./RegisterTermsField";
import { RegisterMessages } from "./RegisterMessages";
import { RegisterSubmitButton } from "./RegisterSubmitButton";

export function RegisterForm({ form }: { form: any }) {
  const inputBase =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition";

  return (
    <form onSubmit={form.handleRegister} className="mt-6 flex flex-col gap-3">
      <label className="text-sm text-white/70">Email</label>
      <input
        ref={form.emailRef}
        type="email"
        placeholder="Email"
        className={`${inputBase} ${
          form.emailInvalid ? "border-red-500/60 focus:ring-red-500/20" : ""
        }`}
        value={form.email}
        onChange={(e) => form.setEmail(e.target.value)}
        autoComplete="email"
        disabled={form.loading}
      />

      <label className="mt-2 text-sm text-white/70">Parolă</label>
      <div ref={form.passWrapRef}>
        <PasswordInput
          value={form.password}
          onChange={form.setPassword}
          placeholder="Parolă"
          className="w-full"
          inputClassName={inputBase}
          autoComplete="new-password"
          disabled={form.loading}
        />
      </div>

      <PasswordStrength
        password={form.password}
        strengthLabel={form.strength.label}
        strengthScore={form.strength.score}
        barClass={form.barClass}
        req={form.req}
      />

      <label className="mt-2 text-sm text-white/70">Confirmă parola</label>
      <div ref={form.pass2WrapRef}>
        <PasswordInput
          value={form.password2}
          onChange={form.setPassword2}
          placeholder="Confirmă parola"
          className="w-full"
          inputClassName={inputBase}
          autoComplete="new-password"
          disabled={form.loading}
        />
      </div>

      <RegisterTermsField
        termsRef={form.termsRef}
        acceptTerms={form.acceptTerms}
        setAcceptTerms={form.setAcceptTerms}
        loading={form.loading}
      />

      <RegisterMessages
        errorMsg={form.errorMsg}
        successMsg={form.successMsg}
        goToLogin={form.goToLogin}
      />

      <RegisterSubmitButton loading={form.loading} />
    </form>
  );
}