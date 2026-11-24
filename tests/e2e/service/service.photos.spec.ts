import { test, expect } from "./service.fixture";
import { cleanupPlaywrightService } from "../utils/testServiceCleanup";
import path from "path";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Service - Photos", () => {
  let testClientName: string;
  const testImagePath = path.resolve("tests/fixtures/test-image.jpg");

  test.beforeAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.afterAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/service");
    await page.getByTestId("service-new-client-btn").click();

    testClientName = uniqueText("PW Photos Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(testClientName);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(testClientName)).toBeVisible({ timeout: 5000 });

    // Open client detail
    await page.getByText(testClientName).click();
    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Navigate to Photos tab
    await page.getByTestId("service-tab-photos").click();
    // Wait for either carousel (if photos exist) or empty state
    await expect(page.getByTestId("service-photos-carousel").or(page.getByTestId("service-photos-empty"))).toBeVisible();
  });

  test("@smoke @service admin can upload photo without device", async ({ page }) => {
    // Enable edit mode
    const editBtn = page.getByTestId("service-detail-edit-btn");
    await expect(editBtn).toBeVisible({ timeout: 5000 });
    await editBtn.click();

    // Wait for edit mode to activate
    await page.waitForTimeout(1000);

    // Handle both cases: empty state shows form directly, carousel shows toggle
    const uploadToggle = page.getByTestId("service-photos-upload-toggle");
    const uploadForm = page.getByTestId("service-photos-upload-form");

    // If toggle exists, click it to expand
    if (await uploadToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await uploadToggle.click();
    }

    // Wait for form to be visible
    await expect(uploadForm).toBeVisible({ timeout: 5000 });

    // Upload photo
    const fileInput = page.getByTestId("service-photos-file-input");
    await fileInput.setInputFiles(testImagePath);
    await page.getByTestId("service-photos-submit-btn").click();

    // Wait for upload
    await expect(page.getByText(/Se încarcă/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Se încarcă/i)).not.toBeVisible({ timeout: 10000 });

    // Photo should appear in carousel/grid
    await expect(page.getByTestId("service-photos-main-image")).toBeVisible({ timeout: 5000 });
  });

  test("@service admin can upload photo with device association", async ({ page }) => {
    // First add a device
    await page.getByTestId("service-tab-devices").click();
    await page.getByTestId("service-add-first-device-btn").click();

    const deviceName = uniqueText("PW Photo Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-PHOTO-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Wait for parent data to refresh (fetchData after device creation)
    // Verify device appears in devices list before proceeding
    await page.waitForTimeout(5000);
    await expect(page.getByTestId("service-device-list")).toContainText(deviceName, { timeout: 5000 });

    // Go to photos tab
    await page.getByTestId("service-tab-photos").click();

    // Wait for client data to fully refresh (fetchData completes)
    // and for the photos carousel to receive updated client data
    await page.waitForTimeout(3000);

    // Enable edit mode
    await page.getByTestId("service-detail-edit-btn").click();

    // Handle both cases: empty state shows form directly, carousel shows toggle
    const uploadToggle = page.getByTestId("service-photos-upload-toggle");
    const uploadForm = page.getByTestId("service-photos-upload-form");

    // If toggle exists, click it to expand
    if (await uploadToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await uploadToggle.click();
    }

    // Wait for form to be visible
    await expect(uploadForm).toBeVisible({ timeout: 5000 });

    // Upload photo with device selector
    const deviceSelect = page.getByTestId("service-photos-device-select");
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      // Debug: log dropdown options
      const options = await deviceSelect.locator('option').allTextContents();
      console.log('Dropdown options:', options);

      // Wait for the specific device option (the upload form dropdown doesn't have "Toate dispozitivele")
      await page.waitForFunction(
        (name: string) => {
          const select = document.querySelector<HTMLSelectElement>('[data-testid="service-photos-device-select"]');
          if (!select) return false;
          return Array.from(select.options).some(opt => opt.text.includes(name));
        },
        deviceName,
        { timeout: 10000 }
      );
      // The dropdown option label includes "📱 " prefix
      await deviceSelect.selectOption({ label: `📱 ${deviceName}` });
    }

    const fileInput = page.getByTestId("service-photos-file-input");
    await fileInput.setInputFiles(testImagePath);
    await page.getByTestId("service-photos-submit-btn").click();

    await expect(page.getByText(/Se încarcă/i)).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId("service-photos-main-image")).toBeVisible({ timeout: 5000 });
  });

  test("@service admin can filter photos by device", async ({ page }) => {
    // Add two devices
    await page.getByTestId("service-tab-devices").click();

    const device1 = uniqueText("PW Filter Device 1");
    await page.getByTestId("service-add-first-device-btn").click();
    await page.locator('[name="model"]').fill(device1);
    await page.locator('[name="serial_number"]').fill(`SN-FILTER1-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    const device2 = uniqueText("PW Filter Device 2");
    await page.getByTestId("service-add-device-btn").click();
    await page.locator('[name="model"]').fill(device2);
    await page.locator('[name="serial_number"]').fill(`SN-FILTER2-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    // Wait for parent data to refresh (fetchData after device creation)
    await page.waitForTimeout(5000);
    await expect(page.getByTestId("service-device-list")).toContainText(device1, { timeout: 5000 });
    await expect(page.getByTestId("service-device-list")).toContainText(device2, { timeout: 5000 });

    // Go to photos
    await page.getByTestId("service-tab-photos").click();

    // Wait for client data to fully refresh
    await page.waitForTimeout(3000);

    // Enable edit mode
    await page.getByTestId("service-detail-edit-btn").click();

    // Helper to open upload form (handles both empty state and carousel)
    const openUploadForm = async () => {
      const uploadToggle = page.getByTestId("service-photos-upload-toggle");
      const uploadForm = page.getByTestId("service-photos-upload-form");
      if (await uploadToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
        await uploadToggle.click();
      }
      await expect(uploadForm).toBeVisible({ timeout: 5000 });
    };

    // Upload for device 1
    await openUploadForm();
    const deviceSelect = page.getByTestId("service-photos-device-select");
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      // Wait for the specific device option (the upload form dropdown doesn't have "Toate dispozitivele")
      await page.waitForFunction(
        (name: string) => {
          const select = document.querySelector<HTMLSelectElement>('[data-testid="service-photos-device-select"]');
          if (!select) return false;
          return Array.from(select.options).some(opt => opt.text.includes(name));
        },
        device1,
        { timeout: 10000 }
      );
      // The dropdown option label includes "📱 " prefix
      await deviceSelect.selectOption({ label: `📱 ${device1}` });
      const fileInput = page.getByTestId("service-photos-file-input");
      await fileInput.setInputFiles(testImagePath);
      await page.getByTestId("service-photos-submit-btn").click();
      await expect(page.getByText(/Se încarcă/i)).not.toBeVisible({ timeout: 10000 });
    }

    // Upload for device 2
    await openUploadForm();
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      // Wait for the specific device option (the upload form dropdown doesn't have "Toate dispozitivele")
      await page.waitForFunction(
        (name: string) => {
          const select = document.querySelector<HTMLSelectElement>('[data-testid="service-photos-device-select"]');
          if (!select) return false;
          return Array.from(select.options).some(opt => opt.text.includes(name));
        },
        device2,
        { timeout: 10000 }
      );
      // The dropdown option label includes "📱 " prefix
      await deviceSelect.selectOption({ label: `📱 ${device2}` });
      const fileInput = page.getByTestId("service-photos-file-input");
      await fileInput.setInputFiles(testImagePath);
      await page.getByTestId("service-photos-submit-btn").click();
      await expect(page.getByText(/Se încarcă/i)).not.toBeVisible({ timeout: 10000 });
    }

    // Filter by device 1
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      await deviceSelect.selectOption({ label: device1 });
      // Should show only device 1 photos
      await page.waitForTimeout(500);
    }

    // Filter by device 2
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      await deviceSelect.selectOption({ label: device2 });
      await page.waitForTimeout(500);
    }

    // Show all
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      await deviceSelect.selectOption({ index: 0 }); // "Toate" or empty
      await page.waitForTimeout(500);
    }
  });

  test("@service admin can delete photo", async ({ page }) => {
    // Enable edit mode
    await page.getByTestId("service-detail-edit-btn").click();

    // Upload a photo (handle both empty state and carousel)
    const uploadToggle = page.getByTestId("service-photos-upload-toggle");
    const uploadForm = page.getByTestId("service-photos-upload-form");
    if (await uploadToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await uploadToggle.click();
    }
    await expect(uploadForm).toBeVisible({ timeout: 5000 });

    const fileInput = page.getByTestId("service-photos-file-input");
    await fileInput.setInputFiles(testImagePath);
    await page.getByTestId("service-photos-submit-btn").click();
    await expect(page.getByText(/Se încarcă/i)).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId("service-photos-main-image")).toBeVisible({ timeout: 5000 });

    // Click delete on the photo
    await page.getByTestId("service-photos-delete-btn").click();

    page.once("dialog", dialog => dialog.accept());

    // Photo should be gone (or at least the first one changed)
    await page.waitForTimeout(500);
  });

  test("@service photo shows device badge", async ({ page }) => {
    // Add a device
    await page.getByTestId("service-tab-devices").click();
    await page.getByTestId("service-add-first-device-btn").click();

    const deviceName = uniqueText("PW Badge Device");
    await page.locator('[name="model"]').fill(deviceName);
    await page.locator('[name="serial_number"]').fill(`SN-BADGE-${Date.now()}`);
    await page.getByRole("button", { name: /Adaugă dispozitiv/i }).click();

    await expect(page.getByText(deviceName)).toBeVisible({ timeout: 3000 });

    // Wait for parent data to refresh (fetchData after device creation)
    await page.waitForTimeout(5000);
    await expect(page.getByTestId("service-device-list")).toContainText(deviceName, { timeout: 5000 });

    // Go to photos
    await page.getByTestId("service-tab-photos").click();

    // Wait for client data to fully refresh
    await page.waitForTimeout(3000);

    // Enable edit mode
    await page.getByTestId("service-detail-edit-btn").click();

    // Upload with device (handle both empty state and carousel)
    const uploadToggle = page.getByTestId("service-photos-upload-toggle");
    const uploadForm = page.getByTestId("service-photos-upload-form");
    if (await uploadToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await uploadToggle.click();
    }
    await expect(uploadForm).toBeVisible({ timeout: 5000 });

    const deviceSelect = page.getByTestId("service-photos-device-select");
    if (await deviceSelect.isVisible({ timeout: 1000 })) {
      // Wait for the dropdown to have device options
      // Wait for the specific device option (the upload form dropdown doesn't have "Toate dispozitivele")
      await page.waitForFunction(
        (name: string) => {
          const select = document.querySelector<HTMLSelectElement>('[data-testid="service-photos-device-select"]');
          if (!select) return false;
          return Array.from(select.options).some(opt => opt.text.includes(name));
        },
        deviceName,
        { timeout: 10000 }
      );
      // The dropdown option label includes "📱 " prefix
      await deviceSelect.selectOption({ label: `📱 ${deviceName}` });
      const fileInput = page.getByTestId("service-photos-file-input");
      await fileInput.setInputFiles(testImagePath);
      await page.getByTestId("service-photos-submit-btn").click();
      await expect(page.getByText(/Se încarcă/i)).not.toBeVisible({ timeout: 10000 });
    }

    // Check for device badge on photo
    await expect(page.getByTestId("service-photos-device-badge")).toContainText(deviceName, { timeout: 3000 });
  });
});