"use client";

import { supabase } from "@/lib/supabase";

export function useResetMfa() {
  const resetMfa = async () => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      const userId = authUser.user?.id;

      if (!userId) {
        alert("User not found");
        return;
      }

      const res = await fetch("/api/admin/users/reset-mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const result = isJson ? await res.json() : null;

      if (!res.ok) {
        alert(result?.error || "Reset MFA failed");
        return;
      }

      localStorage.removeItem("pending_mfa_setup");
      alert(`MFA reset. Deleted: ${result?.deleted ?? 0}`);
      window.location.reload();
    } catch (e: any) {
      alert(e?.message || "Reset MFA failed");
    }
  };

  return { resetMfa };
}