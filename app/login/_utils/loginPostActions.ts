import { supabase } from "@/lib/supabase";
import { TERMS_VERSION } from "@/app/terms";

type PendingTerms = {
  terms_version: string;
  email_snapshot?: string;
};

export async function saveTermsAcceptance(user: {
  id: string;
  email?: string | null;
}) {
  let pending: PendingTerms | null = null;

  try {
    const raw = localStorage.getItem("pending_terms_acceptance");
    pending = raw ? JSON.parse(raw) : null;
  } catch {}

  try {
    const { data: existing } = await supabase
      .from("terms_acceptances")
      .select("id")
      .eq("user_id", user.id)
      .eq("terms_version", TERMS_VERSION)
      .maybeSingle();

    if (!existing) {
      await supabase.from("terms_acceptances").insert({
        user_id: user.id,
        terms_version: TERMS_VERSION,
        email_snapshot: pending?.email_snapshot ?? user.email ?? null,
        user_agent: navigator.userAgent,
      });

      localStorage.removeItem("pending_terms_acceptance");
    }
  } catch {}
}

export async function getUserRole(userId: string): Promise<"admin" | "user"> {
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    return profile?.role === "admin" ? "admin" : "user";
  } catch {
    return "user";
  }
}

export async function userHas2FA(): Promise<boolean> {
  try {
    const { data: factors } = await supabase.auth.mfa.listFactors();
    return (factors?.totp ?? []).length > 0;
  } catch {
    return false;
  }
}