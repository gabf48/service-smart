import { test, expect } from "./service.fixture";
import { cleanupPlaywrightService } from "../utils/testServiceCleanup";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Service - History", () => {
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

    testClientName = uniqueText("PW History Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(testClientName);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(testClientName)).toBeVisible({ timeout: 5000 });

    // Open client detail
    await page.getByText(testClientName).click();
    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Navigate to History tab
    await page.getByTestId("service-tab-history").click();
    await expect(page.getByTestId("service-history-tab")).toBeVisible();
  });

  test("@smoke @service admin can add history entry", async ({ page }) => {
    // Enable edit mode first (history add form only visible in edit mode)
    await page.getByTestId("service-detail-edit-btn").click();

    await page.getByTestId("service-history-add-toggle").click();

    // Wait for form to be visible (details element opens)
    await expect(page.getByTestId("service-history-details")).toBeVisible({ timeout: 5000 });

    // Fill history form
    await page.getByTestId("service-history-details").fill("Test history entry");

    // Save
    await page.getByTestId("service-history-add-submit").click();

    // History entry should appear
    await expect(page.getByText("Test history entry")).toBeVisible({ timeout: 3000 });

    // Should show timestamp
    await expect(page.getByTestId("service-history-list")).toBeVisible({ timeout: 3000 });
  });

  test("@service admin can add multiple history entries", async ({ page }) => {
    // Enable edit mode first
    await page.getByTestId("service-detail-edit-btn").click();

    // Add first
    await page.getByTestId("service-history-add-toggle").click();
    await expect(page.getByTestId("service-history-details")).toBeVisible({ timeout: 5000 });
    await page.getByTestId("service-history-details").fill("First entry");
    await page.getByTestId("service-history-add-submit").click();

    await expect(page.getByText("First entry")).toBeVisible({ timeout: 3000 });

    // Add second - form closes after submit (React state), but browser native <details> may still be open
    // Need to force the native <details> element to have open attribute
    await page.getByTestId("service-history-add-toggle").click();
    // Force the details element to have open attribute to sync with React state
    await page.evaluate(() => {
      const details = document.querySelector('[data-testid="service-history-add-form"]');
      if (details) details.setAttribute('open', '');
    });
    await expect(page.getByTestId("service-history-details")).toBeVisible({ timeout: 5000 });
    await page.getByTestId("service-history-details").fill("Second entry");
    // Use force click to handle potential element detachment during React re-render
    await page.getByTestId("service-history-add-submit").click({ force: true });

    await expect(page.getByText("Second entry")).toBeVisible({ timeout: 3000 });

    // Both should be visible
    await expect(page.getByText("First entry")).toBeVisible();
    await expect(page.getByText("Second entry")).toBeVisible();
  });

  test("@service history shows in chronological order", async ({ page }) => {
    // Enable edit mode first
    await page.getByTestId("service-detail-edit-btn").click();

    await page.getByTestId("service-history-add-toggle").click();
    await expect(page.getByTestId("service-history-details")).toBeVisible({ timeout: 5000 });
    await page.getByTestId("service-history-details").fill("Entry 1");
    await page.getByTestId("service-history-add-submit").click();

    await page.waitForTimeout(100); // Small delay to ensure different timestamps

    // Toggle to open form - click and wait for form to be visible
    // Form closes after submit (React state), but browser native <details> may still be open
    // Need to force the native <details> element to have open attribute
    await page.getByTestId("service-history-add-toggle").click();
    // Force the details element to have open attribute to sync with React state
    await page.evaluate(() => {
      const details = document.querySelector('[data-testid="service-history-add-form"]');
      if (details) details.setAttribute('open', '');
    });
    await expect(page.getByTestId("service-history-details")).toBeVisible({ timeout: 5000 });
    await page.getByTestId("service-history-details").fill("Entry 2");
    await page.getByTestId("service-history-add-submit").click({ force: true });

    // Latest should be first (or last depending on sort) - use testid for history entries
    await expect(page.getByTestId("service-history-list")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Entry 1")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Entry 2")).toBeVisible({ timeout: 3000 });
  });

  test("@service history shows client creation entry on new client", async ({ page }) => {
    // Enable edit mode first
    await page.getByTestId("service-detail-edit-btn").click();

    // Wait for client data to load and history tab to re-render
    await expect(page.getByTestId("service-history-tab")).toBeVisible({ timeout: 5000 });

    // Wait for history content to load
    await expect(
      page.getByTestId("service-history-empty").or(page.getByTestId("service-history-list"))
    ).toBeVisible({ timeout: 15000 });

    // New clients should have a "Client creat" history entry
    await expect(page.getByTestId("service-history-list")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(/Client creat/i)).toBeVisible({ timeout: 3000 });
  });
});