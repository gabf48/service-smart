"use client";

import { useId, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Parolă",
  className = "",
  inputClassName = "",
  name = "password",
  autoComplete = "current-password",
  disabled = false,
}: Props) {
  const [show, setShow] = useState(false);
  const id = useId();

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={`border p-2 pr-11 w-full ${inputClassName}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        disabled={disabled}
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-slate-600 hover:text-slate-900"
        aria-label={show ? "Ascunde parola" : "Arată parola"}
        aria-pressed={show}
        disabled={disabled}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}