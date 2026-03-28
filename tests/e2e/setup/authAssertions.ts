import { expect, type Page } from "@playwright/test";

export async function expectLoginFormReady(page: Page) {
  await expect(page.getByTestId("login-input-email")).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId("login-input-password")).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId("login-hydrated")).toBeAttached({ timeout: 15000 });
  await expect(page.getByTestId("login-submit")).toBeEnabled({ timeout: 15000 });
}

export async function expectLoginSucceeded(
  page: Page,
  urlPattern: RegExp,
  label: string
) {
  const loginError = page.getByTestId("login-error");

  try {
    await page.waitForURL(urlPattern, { timeout: 15000 });
  } catch {
    if (await loginError.isVisible().catch(() => false)) {
      const text = await loginError.textContent();
      throw new Error(`${label} login failed: ${text}`);
    }

    throw new Error(`${label} login failed: still on login page (${page.url()})`);
  }

  await expect(page).toHaveURL(urlPattern);
}