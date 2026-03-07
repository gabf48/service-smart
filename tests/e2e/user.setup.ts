import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.playwright" });

const authDir = path.resolve("tests/e2e/.auth");
const authFile = path.resolve("tests/e2e/.auth/user.json");

setup("authenticate as user", async ({ page }) => {
  const email = process.env.PLAYWRIGHT_USER_EMAIL;
  const password = process.env.PLAYWRIGHT_USER_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing PLAYWRIGHT_USER_EMAIL or PLAYWRIGHT_USER_PASSWORD");
  }

  fs.mkdirSync(authDir, { recursive: true });

  await page.goto("/login");

  await page.getByTestId("login-input-email").fill(email);
  await page.getByTestId("login-input-password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/dashboard|reviews|user/i);

  await page.context().storageState({
    path: authFile,
  });
});