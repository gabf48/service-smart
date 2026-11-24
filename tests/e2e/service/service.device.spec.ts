import { test, expect } from "./service.fixture";
import { cleanupPlaywrightService } from "../utils/testServiceCleanup";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

// Helper to get device card by model name
function getDeviceCard(page: any, deviceName: string) {
  return page.locator('[data-testid^="service-device-card-"]', { hasText: deviceName }).first();
}

test.describe("Service - Device Management", () => {
  let testClientName: string;

  test.beforeAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.afterAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.beforeEach(async ({ page }) => {
    // Create a test client for device tests
    await page.goto("/service");
    await page.getByTestId("service-new-client-btn").click();

    testClientName = uniqueText("PW Device Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(testClientName);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(testClientName)).toBeVisible({ timeout: 5000 });

    // Open client detail
    await page.getByText(testClientName).click();
    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Navigate to Devices tab
    await page.getByTestId("service-tab-devices").click();
    // Wait for either empty state or device list
    await expect(page.getByTestId("service-device-list-empty")).toBeVisible({ timeout: 5000 });
  });

  test("@smoke @service admin can add first device", async ({ page }) => {
    // Click "Adaugă primul dispozitiv" or similar
    await page.getByTestId("service-add-first-device-btn").click();

    // Fill device form using name attributes
    const deviceName = uniqueText("PW Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-${Date.now()}`);
    await page.locator('[name="service_tag"]').fill(`IMEI-${Date.now()}`);

    // Select status if dropdown exists
    const statusSelect = page.locator('[name="status_id"]');
    if (await statusSelect.isVisible({ timeout: 1000 })) {
      const options = await statusSelect.locator("option").all();
      if (options.length > 1) {
        const firstStatusValue = await options[1].getAttribute("value");
        if (firstStatusValue) {
          await statusSelect.selectOption(firstStatusValue);
        }
      }
    }

    // Save
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    // Device should appear in list
    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });
  });

  test("@service admin can add multiple devices", async ({ page }) => {
    // Add first device
    await page.getByTestId("service-add-first-device-btn").click();
    const deviceName1 = uniqueText("PW Device 1");
    await page.locator('[name="model"]').fill(deviceName1);
    await page.locator('[name="serial_number"]').fill(`SN1-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();
    await expect(page.getByText(deviceName1)).toBeVisible({ timeout: 3000 });

    // Add second device - button should now be "service-add-device-btn"
    await page.getByTestId("service-add-device-btn").click();
    const deviceName2 = uniqueText("PW Device 2");
    await page.locator('[name="model"]').fill(deviceName2);
    await page.locator('[name="serial_number"]').fill(`SN2-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName2)).toBeVisible({ timeout: 3000 });

    // Verify both devices exist by their exact names
    await expect(page.getByText(deviceName1)).toBeVisible();
    await expect(page.getByText(deviceName2)).toBeVisible();
  });

  test("@service admin can edit device", async ({ page }) => {
    // First add a device
    await page.getByTestId("service-add-first-device-btn").click();
    const deviceName = uniqueText("PW Edit Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-EDIT-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Click edit on the device
    const deviceCard = getDeviceCard(page, deviceName);
    await deviceCard.getByTestId(/service-device-edit-btn-/).click();

    // Wait for edit form to appear
    await expect(page.getByTestId("service-device-form")).toBeVisible({ timeout: 3000 });

    // Update name - scope to the form
    const updatedName = uniqueText("PW Updated Device");
    await page.getByTestId("service-device-form").locator('[name="model"]').fill(updatedName);
    // Submit form via Enter key to avoid interception issues
    await page.getByTestId("service-device-form").locator('[name="model"]').press("Enter");

    // Wait a bit for the update to propagate
    await page.waitForTimeout(2000);

    // Verify update - check if the device name in the list updated
    await expect(page.getByText(updatedName)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(deviceName)).not.toBeVisible();
  });

  test("@service admin can change device status", async ({ page }) => {
    // Add a device
    await page.getByTestId("service-add-first-device-btn").click();
    const deviceName = uniqueText("PW Status Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-STATUS-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Find device card and change status
    const deviceCard = getDeviceCard(page, deviceName);
    const statusSelect = deviceCard.locator('[name="status_id"]').first();

    if (await statusSelect.isVisible({ timeout: 1000 })) {
      await statusSelect.selectOption({ index: 1 });
      await page.waitForTimeout(500);
    }
  });

  test("@service admin can expand device to see components", async ({ page }) => {
    // Add a device
    await page.getByTestId("service-add-first-device-btn").click();
    const deviceName = uniqueText("PW Component Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-COMP-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Click expand arrow
    const deviceCard = getDeviceCard(page, deviceName);
    await deviceCard.getByTestId(/service-device-expand-/).click();

    // Components section should be visible
    await expect(deviceCard.getByTestId(/service-device-components-/)).toBeVisible({ timeout: 2000 });
  });

  test("@service admin can expand device to see add component option", async ({ page }) => {
    // Add a device
    await page.getByTestId("service-add-first-device-btn").click();
    const deviceName = uniqueText("PW Comp Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-COMP-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Click expand arrow
    const deviceCard = getDeviceCard(page, deviceName);
    await deviceCard.getByTestId(/service-device-expand-/).click();

    // Add component button should be visible (uses first component type)
    await expect(deviceCard.getByTestId(/service-device-add-component-/)).toBeVisible({ timeout: 2000 });
  });

  test("@service admin can delete device", async ({ page }) => {
    // Add a device to delete (using add-first-device-btn since no devices exist yet)
    await page.getByTestId("service-add-first-device-btn").click();
    const deviceName = uniqueText("PW Delete Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-DEL-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Delete device - two step: click delete, then confirm
    const deviceCard = getDeviceCard(page, deviceName);
    await deviceCard.getByTestId(/service-device-delete-btn-/).click();

    // Wait for confirm button to appear and click it
    await deviceCard.getByTestId(/service-device-delete-confirm-/).waitFor({ state: "visible", timeout: 3000 });
    await deviceCard.getByTestId(/service-device-delete-confirm-/).click();

    // Device should be gone
    await expect(page.getByText(deviceName)).not.toBeVisible({ timeout: 3000 });
  });
});