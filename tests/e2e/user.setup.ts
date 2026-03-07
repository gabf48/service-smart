import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const authDir = path.join(__dirname, ".auth");
const authFile = path.join(authDir, "user.json");

setup("authenticate as user", async ({ page }) => {
  const email = process.env.PLAYWRIGHT_USER_EMAIL;
  const password = process.env.PLAYWRIGHT_USER_PASSWORD;
  const baseURL = process.env.PLAYWRIGHT_BASE_URL;

  if (!email || !password) {
    throw new Error(
      `Missing user credentials. EMAIL=${email ? "ok" : "missing"} PASSWORD=${password ? "ok" : "missing"}`
    );
  }

  fs.mkdirSync(authDir, { recursive: true });

  await page.goto(`${baseURL}/login`);

  await page.getByTestId("login-input-email").fill(email);
  await page.getByTestId("login-input-password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/dashboard|reviews|user/i);

  await page.context().storageState({ path: authFile });
});