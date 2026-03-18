import { supabase } from "@/lib/supabase";
import type { UserRow } from "../_types/users";

export async function fetchUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,role,is_active")
    .order("email");

  return {
    data: (data as UserRow[]) || [],
    error,
  };
}

export async function updateUserRole(id: string, role: "admin" | "user") {
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", id);

  return { error };
}

export async function updateUserActiveStatus(id: string, is_active: boolean) {
  const { error } = await supabase
    .from("profiles")
    .update({ is_active })
    .eq("id", id);

  return { error };
}

export async function sendResetPasswordEmail(user: UserRow) {
  const response = await fetch("/api/admin/users/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.email }),
  });

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      error: "Serverul a răspuns invalid.",
    };
  }

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.error === "string" &&
      result.error.toLowerCase().includes("rate limit")
        ? "Prea multe emailuri trimise. Încearcă mai târziu."
        : result?.error || "Nu s-a putut trimite emailul.";

    return {
      ok: false,
      error: message,
    };
  }

  return {
    ok: true,
    error: null,
  };
}