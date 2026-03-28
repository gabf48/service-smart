import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.playwright" });

const authDir = path.join(__dirname, ".auth");
const authFile = path.join(authDir, "admin.json");

setup("authenticate as admin", async ({ page }) => {
  const email = process.env.PLAYWRIGHT_ADMIN_EMAIL;
  const password = process.env.PLAYWRIGHT_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Missing PLAYWRIGHT_ADMIN_EMAIL or PLAYWRIGHT_ADMIN_PASSWORD in .env.playwright"
    );
  }

  fs.mkdirSync(authDir, { recursive: true });

  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");
  await page.getByTestId("login-input-email").fill(email);
  await page.getByTestId("login-input-password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/dashboard|reviews|admin/i);

  await page.context().storageState({ path: authFile });
});