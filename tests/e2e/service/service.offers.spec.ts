import { test, expect } from "./service.fixture";
import { cleanupPlaywrightService } from "../utils/testServiceCleanup";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Service - Offers / Parts", () => {
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

    testClientName = uniqueText("PW Offers Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(testClientName);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(testClientName)).toBeVisible({ timeout: 5000 });

    // Open client detail
    await page.getByText(testClientName).click();
    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Navigate to Offers tab
    await page.getByTestId("service-tab-offers").click();
    // Wait for either offers list (if offers exist) or empty state
    await expect(page.getByTestId("service-offers-list").or(page.getByTestId("service-offers-empty"))).toBeVisible();
  });

  test("@smoke @service offers tab shows empty state when no offers", async ({ page }) => {
    // Should show empty state with message
    await expect(page.getByTestId("service-offers-empty")).toBeVisible();
    await expect(page.getByText(/Nicio ofertă/i)).toBeVisible();
  });

  test("@service offers tab can be navigated", async ({ page }) => {
    // Just verify we can navigate to the offers tab
    await expect(page.getByTestId("service-tab-offers")).toBeVisible();
    await page.getByTestId("service-tab-offers").click();
    await expect(page.getByTestId("service-offers-list").or(page.getByTestId("service-offers-empty"))).toBeVisible();
  });

  // Note: Adding offers is done from device search results, not from the offers tab directly.
  // The empty state says: "Pornește o căutare dintr-un device sau folosește butonul „Salvează la client” din rezultatele căutării."
  // So add/edit/delete tests would require first searching for parts from a device.
  // These tests are skipped for now.
});