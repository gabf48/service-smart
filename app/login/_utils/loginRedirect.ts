import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function redirectAfterLogin({
  router,
  role,
  has2FA,
}: {
  router: AppRouterInstance;
  role: "admin" | "user";
  has2FA: boolean;
}) {
  if (has2FA) {
    router.push("/mfa/verify");
    return;
  }

  router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
}