"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { TERMS_VERSION } from "@/app/terms";
import PasswordInput from "@/components/PasswordInput";

type PendingTerms = {
  terms_version: string;
  email_snapshot?: string;
  accepted_at?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // 1) LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.log("[LOGIN] error:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    const session = data.session;

    if (!user || !session) {
      console.log("[LOGIN] missing user/session:", { user, session });
      alert("Login reușit, dar sesiunea nu este disponibilă. Reîncearcă.");
      setLoading(false);
      return;
    }

    // 2) SESSION CHECK
    const { data: sessionCheck, error: sessionErr } = await supabase.auth.getSession();
    console.log("[LOGIN] user:", user.id, user.email);
    console.log("[LOGIN] session present (from signIn):", !!session);
    console.log("[LOGIN] getSession error:", sessionErr);
    console.log("[LOGIN] getSession uid:", sessionCheck.session?.user?.id);

    // 3) PENDING (localStorage)
    let pending: PendingTerms | null = null;
    try {
      const raw = window.localStorage.getItem("pending_terms_acceptance");
      pending = raw ? (JSON.parse(raw) as PendingTerms) : null;
    } catch (e) {
      console.log("[TERMS] pending parse error:", e);
    }
    console.log("[TERMS] pending:", pending);

    // 4) SELECT existing acceptance
    const { data: existing, error: selectError } = await supabase
      .from("terms_acceptances")
      .select("id")
      .eq("user_id", user.id)
      .eq("terms_version", TERMS_VERSION)
      .maybeSingle();

    console.log("[TERMS] select existing:", existing);
    console.log("[TERMS] selectError:", selectError);

    // 5) INSERT if missing
    if (!selectError && !existing) {
      console.log("[TERMS] trying insert:", {
        user_id: user.id,
        terms_version: TERMS_VERSION,
        email_snapshot: pending?.email_snapshot ?? user.email ?? null,
      });

      const { error: insErr } = await supabase.from("terms_acceptances").insert({
        user_id: user.id,
        terms_version: TERMS_VERSION,
        email_snapshot: pending?.email_snapshot ?? user.email ?? null,
        user_agent: navigator.userAgent,
      });

      console.log("[TERMS] insert error:", insErr);

      if (!insErr) {
        window.localStorage.removeItem("pending_terms_acceptance");
        console.log("[TERMS] pending removed from localStorage");
      }
    }

    // 6) REDIRECT
    const role = user.user_metadata?.role || "user";
    router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

     <PasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Parolă"
  className="w-[320px]"
  inputClassName="border p-2"
  autoComplete="current-password"
  disabled={loading}
/>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Se încarcă..." : "Loghează-te"}
      </button>
    </div>
  );
}