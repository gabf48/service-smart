"use client";

import { useId, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  disabled?: boolean;
  dataTestId?: string;
  toggleDataTestId?: string;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Parolă",
  className = "",
  inputClassName = "",
  name = "password",
  id,
  autoComplete = "current-password",
  disabled = false,
  dataTestId,
  toggleDataTestId,
}: Props) {
  const [show, setShow] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`relative ${className}`}>
      <input
        id={inputId}
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={`border p-2 pr-11 w-full ${inputClassName}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        disabled={disabled}
        data-testid={dataTestId}
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-50"
        aria-label={show ? "Ascunde parola" : "Arată parola"}
        aria-pressed={show}
        aria-controls={inputId}
        disabled={disabled}
        data-testid={toggleDataTestId}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}