import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";
import { expectLoginFormReady, expectLoginSucceeded } from "./authAssertions";

export async function loginAndStoreState({
  page,
  email,
  password,
  authFile,
  successUrl,
  label,
}: {
  page: Page;
  email: string;
  password: string;
  authFile: string;
  successUrl: RegExp;
  label: string;
}) {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expectLoginFormReady(page);

  await page.getByTestId("login-input-email").fill(email);
  await page.getByTestId("login-input-password").fill(password);
  await page.getByTestId("login-submit").click();

  await expectLoginSucceeded(page, successUrl, label);

  await page.context().storageState({ path: authFile });
}