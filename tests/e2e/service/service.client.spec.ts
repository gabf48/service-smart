import { test, expect } from "./service.fixture";
import { cleanupPlaywrightService } from "../utils/testServiceCleanup";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Service - Client CRUD (no pre-existing client)", () => {
  test.beforeAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.afterAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test("@smoke @service admin can open service page", async ({ page }) => {
    await page.goto("/service");

    await expect(page.getByRole("heading", { name: /Clienți & Service/i })).toBeVisible();
    await expect(page.getByTestId("service-new-client-btn")).toBeVisible();
  });

  test("@smoke @service admin can create new client", async ({ page }) => {
    await page.goto("/service");

    // Open create client modal
    await page.getByTestId("service-new-client-btn").click();

    // Wait for modal to appear
    await expect(page.getByRole("heading", { name: /Client nou/i })).toBeVisible();

    // Fill form using test IDs
    const name = uniqueText("PW Test Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(name);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-email").fill(`${name.toLowerCase().replace(/\s+/g, ".")}@test.ro`);
    await page.getByTestId("service-personal-address").fill("Str. Test nr. 123");
    await page.getByTestId("service-personal-notes").fill("Test problem description");

    // Submit
    await page.getByTestId("service-personal-save-btn").click();

    // Modal should close and client should appear in list
    await expect(page.getByRole("heading", { name: /Client nou/i })).not.toBeVisible();
    await expect(page.getByText(name)).toBeVisible({ timeout: 5000 });
  });

  test("@smoke @service admin can search clients", async ({ page }) => {
    await page.goto("/service");

    // Create a client to search for
    await page.getByTestId("service-new-client-btn").click();
    const searchName = uniqueText("PW Search Client");
    const searchPhone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(searchName);
    await page.getByTestId("service-personal-phone").fill(searchPhone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(searchName)).toBeVisible({ timeout: 5000 });

    // Search for the client
    await page.getByTestId("service-search-input").fill("PW Search Client");

    // Wait for filtered results
    await expect(page.getByText(searchName)).toBeVisible({ timeout: 3000 });
  });

  test("@service admin can filter by status", async ({ page }) => {
    await page.goto("/service");

    // Wait for statuses to load
    await page.getByTestId("service-status-filter").waitFor({ timeout: 5000 });

    // Select first available status
    const statusSelect = page.getByTestId("service-status-filter");
    const options = await statusSelect.locator("option").all();
    if (options.length > 1) {
      const firstStatusValue = await options[1].getAttribute("value");
      if (firstStatusValue) {
        await statusSelect.selectOption(firstStatusValue);
        await page.waitForTimeout(500); // Wait for filter to apply
      }
    }
  });

  test("@service admin can delete client from detail modal", async ({ page }) => {
    await page.goto("/service");

    // Create a client to delete
    await page.getByTestId("service-new-client-btn").click();
    const deleteName = uniqueText("PW Delete Me");
    const deletePhone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(deleteName);
    await page.getByTestId("service-personal-phone").fill(deletePhone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(deleteName)).toBeVisible({ timeout: 5000 });

    // Open the client detail
    await page.getByText(deleteName).click();
    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Click delete button
    await page.getByTestId("service-detail-delete-btn").click();

    // Confirm deletion
    await expect(page.getByTestId("service-delete-confirm-panel")).toBeVisible();
    await page.getByTestId("service-delete-confirm-ok").click();

    // Wait for detail modal to close
    await expect(page.getByTestId("service-detail-modal")).not.toBeVisible({ timeout: 5000 });

    // Client should be gone from page
    await expect(page.getByText(deleteName)).not.toBeVisible({ timeout: 3000 });
  });

  test("@service admin can delete client from table", async ({ page }) => {
    await page.goto("/service");

    // Create a client to delete from table
    await page.getByTestId("service-new-client-btn").click();
    const deleteName = uniqueText("PW Table Delete");
    const deletePhone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(deleteName);
    await page.getByTestId("service-personal-phone").fill(deletePhone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(deleteName)).toBeVisible({ timeout: 5000 });

    // Set up dialog handler before clicking
    page.on("dialog", dialog => dialog.accept());

    // Click delete button in table row
    const row = page.locator("tr", { hasText: deleteName });
    await row.getByTestId(/service-client-delete-/).click();

    // Client should be gone (wait longer for list refresh)
    await expect(page.getByText(deleteName)).not.toBeVisible({ timeout: 10000 });
  });

  test("@service ESC closes modal when not editing", async ({ page }) => {
    await page.goto("/service");

    // Open create modal
    await page.getByTestId("service-new-client-btn").click();
    await expect(page.getByRole("heading", { name: /Client nou/i })).toBeVisible();

    // Press ESC
    await page.keyboard.press("Escape");

    // Modal should close
    await expect(page.getByRole("heading", { name: /Client nou/i })).not.toBeVisible();
  });

  test("@service backdrop click closes modal when not editing", async ({ page }) => {
    await page.goto("/service");

    // Open create modal
    await page.getByTestId("service-new-client-btn").click();
    await expect(page.getByRole("heading", { name: /Client nou/i })).toBeVisible();

    // Click on backdrop (outside modal)
    await page.mouse.click(10, 10);

    // Modal should close
    await expect(page.getByRole("heading", { name: /Client nou/i })).not.toBeVisible();
  });
});

test.describe("Service - Client CRUD (with pre-existing client)", () => {
  let testClientName: string;

  test.beforeAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.afterAll(async () => {
    await cleanupPlaywrightService("PW");
  });

  test.beforeEach(async ({ page }) => {
    // Create a test client for tests that need one
    await page.goto("/service");
    await page.getByTestId("service-new-client-btn").click();

    testClientName = uniqueText("PW Test Client");
    const phone = `07${Math.floor(Math.random() * 90000000 + 10000000)}`;

    await page.getByTestId("service-personal-name").fill(testClientName);
    await page.getByTestId("service-personal-phone").fill(phone);
    await page.getByTestId("service-personal-save-btn").click();

    await expect(page.getByText(testClientName)).toBeVisible({ timeout: 5000 });
  });

  test("@service admin can open client detail", async ({ page }) => {
    await page.goto("/service");

    // Find and click on the test client created in beforeEach
    const clientRow = page.getByText(testClientName).first();
    await expect(clientRow).toBeVisible();
    await clientRow.click();

    // Detail modal should open
    await expect(page.getByTestId("service-detail-name")).toBeVisible();
  });

  test("@service admin can edit client", async ({ page }) => {
    await page.goto("/service");

    // Open client detail
    const clientRow = page.getByText(testClientName).first();
    await clientRow.click();

    await expect(page.getByTestId("service-detail-name")).toBeVisible();

    // Click edit button
    await page.getByTestId("service-detail-edit-btn").click();

    // Update name
    const newName = uniqueText("PW Updated Client");
    await page.getByTestId("service-personal-name").fill(newName);

    // Save
    await page.getByTestId("service-personal-save-btn").click();

    // Verify update
    await expect(page.getByTestId("service-detail-name")).toContainText(newName, { timeout: 3000 });
  });
});