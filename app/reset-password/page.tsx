"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function mapResetPasswordErrorToRo(message: string) {
  const msg = message.toLowerCase();

  if (msg.includes("new password should be different")) {
    return "Noua parolă trebuie să fie diferită de parola veche.";
  }

  if (msg.includes("password should be at least")) {
    return "Parola trebuie să respecte lungimea minimă cerută.";
  }

  if (msg.includes("invalid") || msg.includes("expired") || msg.includes("otp")) {
    return "Linkul de resetare este invalid sau a expirat.";
  }

  return "Nu s-a putut reseta parola.";
}

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [canReset, setCanReset] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkRecoveryState = async () => {
      const hash = window.location.hash.replace(/^#/, "");
      const params = new URLSearchParams(hash);

      const hashError = params.get("error");
      const hashErrorCode = params.get("error_code");
      const hashErrorDescription = params.get("error_description");

      if (hashError || hashErrorCode) {
        setErrorMsg(
          mapResetPasswordErrorToRo(
            hashErrorDescription || hashErrorCode || hashError || "invalid recovery link"
          )
        );
        setCanReset(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setErrorMsg("Linkul de resetare este invalid sau a expirat.");
        setCanReset(false);
        setLoading(false);
        return;
      }

      setCanReset(true);
      setLoading(false);
    };

    checkRecoveryState();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving || !canReset) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    if (password.length < 6) {
      setErrorMsg("Parola trebuie să aibă minim 6 caractere.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Parolele nu coincid.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg(mapResetPasswordErrorToRo(error.message));
      setSaving(false);
      return;
    }

    setSuccessMsg("Parola a fost schimbată cu succes.");
    setSaving(false);

    setTimeout(async () => {
      await supabase.auth.signOut();
      router.replace("/login");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/15 border-t-blue-500" />
          <p className="text-sm text-white/70">Se verifică linkul de resetare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh items-center justify-center bg-black p-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white">Resetează parola</h1>
        <p className="mt-2 text-sm text-white/60">
          Introdu parola nouă și confirm-o mai jos.
        </p>

        <form onSubmit={handleReset} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            placeholder="Parolă nouă"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!canReset || saving}
          />

          <input
            type="password"
            placeholder="Confirmă parola"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!canReset || saving}
          />

          {errorMsg && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-200">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={saving || !canReset}
            className="mt-3 rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Se salvează..." : "Resetează parola"}
          </button>
        </form>
      </div>
    </div>
  );
}