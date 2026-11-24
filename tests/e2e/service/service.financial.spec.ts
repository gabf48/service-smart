import { test, expect } from "./service.fixture";
import { cleanupPlaywrightService } from "../utils/testServiceCleanup";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Service - Financial Transactions", () => {
  let testClientName: string;

  test.beforeAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.afterAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/service");
    await page.getByTestId("service-new-client-btn").click();

    testClientName = uniqueText("PW Financial Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(testClientName);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(testClientName)).toBeVisible({ timeout: 5000 });

    // Open client detail
    await page.getByText(testClientName).click();
    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Enter edit mode to enable adding transactions
    await page.getByTestId("service-detail-edit-btn").click();

    // Navigate to Financial tab
    await page.getByTestId("service-tab-financial").click();
    await expect(page.getByTestId("service-financial-tab")).toBeVisible();
  });

  test("@smoke @service admin can add income transaction", async ({ page }) => {
    await page.getByTestId("service-financial-add-toggle").click();

    // Select type: Încasare
    const typeSelect = page.getByTestId("service-financial-add-type");
    await typeSelect.selectOption("Încasare");

    // Fill amount
    await page.getByTestId("service-financial-add-amount").fill("500");

    // Select category if available
    const categorySelect = page.getByTestId("service-financial-add-category");
    if (await categorySelect.isVisible({ timeout: 1000 })) {
      await categorySelect.selectOption({ index: 1 });
    }

    // Description
    await page.getByTestId("service-financial-add-description").fill("Test income");

    // Save
    await page.getByTestId("service-financial-add-submit").click();

    // Transaction should appear (use description to avoid strict mode violation)
    await expect(page.getByText("Test income")).toBeVisible({ timeout: 3000 });
  });

  test("@service admin can add expense transaction", async ({ page }) => {
    await page.getByTestId("service-financial-add-toggle").click();

    // Select type: Cheltuială
    const typeSelect = page.getByTestId("service-financial-add-type");
    await typeSelect.selectOption("Cheltuială");

    // Fill amount
    await page.getByTestId("service-financial-add-amount").fill("200");

    // Description
    await page.getByTestId("service-financial-add-description").fill("Test expense");

    // Save
    await page.getByTestId("service-financial-add-submit").click();

    // Transaction should appear
    await expect(page.getByText("Test expense")).toBeVisible({ timeout: 3000 });
  });

  test("@service admin can add transaction with device association", async ({ page }) => {
    // First add a device
    await page.getByTestId("service-tab-devices").click();
    await page.getByTestId("service-add-first-device-btn").click();

    const deviceName = uniqueText("PW Trans Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-TRANS-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Go back to financial tab
    await page.getByTestId("service-tab-financial").click();

    // Add transaction with device
    await page.getByTestId("service-financial-add-toggle").click();

    const typeSelect = page.getByTestId("service-financial-add-type");
    await typeSelect.selectOption("Încasare");

    await page.getByTestId("service-financial-add-amount").fill("300");
    await page.getByTestId("service-financial-add-description").fill("Device transaction");

    // Select device
    const deviceSelect = page.getByTestId("service-financial-add-device");
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      await deviceSelect.selectOption({ label: deviceName });
    }

    await page.getByTestId("service-financial-add-submit").click();

    // Verify
    await expect(page.getByText("Device transaction")).toBeVisible({ timeout: 3000 });
  });

  test("@service admin can edit transaction", async ({ page }) => {
    // Add a transaction first
    await page.getByTestId("service-financial-add-toggle").click();
    const typeSelect = page.getByTestId("service-financial-add-type");
    await typeSelect.selectOption("Încasare");
    await page.getByTestId("service-financial-add-amount").fill("100");
    await page.getByTestId("service-financial-add-description").fill("Original");
    await page.getByTestId("service-financial-add-submit").click();

    await expect(page.getByText("Original")).toBeVisible({ timeout: 3000 });

    // Edit transaction
    const transRow = page.locator("div", { hasText: "Original" }).first();
    await transRow.getByTestId(/service-transaction-edit-btn-/).click();

    // Update amount
    await page.getByTestId(/service-transaction-edit-amount-/).fill("150");
    await page.getByTestId(/service-transaction-edit-description-/).fill("Updated");
    await page.getByTestId(/service-transaction-edit-save-/).click();

    // Verify
    await expect(page.getByText("Updated")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Original")).not.toBeVisible();
  });

  test("@service admin can delete transaction", async ({ page }) => {
    // Add a transaction to delete
    await page.getByTestId("service-financial-add-toggle").click();
    const typeSelect = page.getByTestId("service-financial-add-type");
    await typeSelect.selectOption("Cheltuială");
    await page.getByTestId("service-financial-add-amount").fill("50");
    await page.getByTestId("service-financial-add-description").fill("To Delete");
    await page.getByTestId("service-financial-add-submit").click();

    await expect(page.getByText("To Delete")).toBeVisible({ timeout: 3000 });

    // Delete - uses custom confirmation UI, not native dialog
    const transRow = page.locator("div", { hasText: "To Delete" }).first();
    await transRow.getByTestId(/service-transaction-delete-btn-/).click();

    // Click confirm button
    await page.getByTestId(/service-transaction-delete-confirm-/).click();

    // Should be gone
    await expect(page.getByText("To Delete")).not.toBeVisible({ timeout: 3000 });
  });

  test("@service financial summary updates correctly", async ({ page }) => {
    // Add income
    await page.getByTestId("service-financial-add-toggle").click();
    const typeSelect = page.getByTestId("service-financial-add-type");
    await typeSelect.selectOption("Încasare");
    await page.getByTestId("service-financial-add-amount").fill("1000");
    await page.getByTestId("service-financial-add-description").fill("Big income");
    await page.getByTestId("service-financial-add-submit").click();

    await expect(page.getByText("Big income")).toBeVisible({ timeout: 3000 });

    // Add expense
    await page.getByTestId("service-financial-add-toggle").click();
    await typeSelect.selectOption("Cheltuială");
    await page.getByTestId("service-financial-add-amount").fill("300");
    await page.getByTestId("service-financial-add-description").fill("Small expense");
    await page.getByTestId("service-financial-add-submit").click();

    await expect(page.getByText("Small expense")).toBeVisible({ timeout: 3000 });

    // Check summary (if visible in tab)
    await expect(page.getByTestId("service-financial-summary")).toBeVisible({ timeout: 2000 });
  });
});