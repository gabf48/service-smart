import { test as setup } from "@playwright/test";
import { getAdminCredentials } from "./setup/authEnv";
import { loginAndStoreState } from "./setup/authLogin";
import { adminAuthFile } from "./setup/authPaths";

setup("authenticate as admin", async ({ page }) => {
  const { email, password } = getAdminCredentials();

  await loginAndStoreState({
    page,
    email,
    password,
    authFile: adminAuthFile,
    successUrl: /dashboard|reviews|admin/i,
    label: "Admin",
  });
});