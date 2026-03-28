import { test as setup } from "@playwright/test";
import { getUserCredentials } from "./setup/authEnv";
import { loginAndStoreState } from "./setup/authLogin";
import { userAuthFile } from "./setup/authPaths";

setup("authenticate as user", async ({ page }) => {
  const { email, password } = getUserCredentials();

  await loginAndStoreState({
    page,
    email,
    password,
    authFile: userAuthFile,
    successUrl: /dashboard|reviews|user/i,
    label: "User",
  });
});