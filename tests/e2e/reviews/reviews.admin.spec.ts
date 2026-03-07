import { test, expect } from "./admin.fixture";
import { createReviewViaUi } from "../utils/createReviewViaUi";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Admin reviews moderation", () => {
  test("@smoke @admin admin can open reviews dashboard", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    await expect(page.getByTestId("admin-reviews-page")).toBeVisible();
    await expect(page.getByTestId("admin-reviews-header")).toBeVisible();
  });

  test("@regression @admin admin can switch tabs", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    await page.getByTestId("admin-reviews-tab-approved").click();
    await page.getByTestId("admin-reviews-tab-pending").click();
  });

  test("@smoke @admin admin can approve newly created review", async ({ browser, page }) => {
    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();

    const reviewName = uniqueText("PW Approve");
    const reviewComment = uniqueText("PW review approve");

    await createReviewViaUi(guestPage, {
      name: reviewName,
      comment: reviewComment,
      rating: 5,
    });

    await guestContext.close();

    await page.goto("/dashboard/admin/reviews");
    await page.getByTestId("admin-reviews-tab-pending").click();

    const card = page.getByTestId("admin-review-card").filter({
      hasText: reviewComment,
    });

    await expect(card).toBeVisible();

    await card.getByTestId("admin-review-approve").click();

    await expect(page.getByTestId("admin-reviews-toast")).toBeVisible();

    await page.getByTestId("admin-reviews-tab-approved").click();

    const approvedCard = page.getByTestId("admin-review-card").filter({
      hasText: reviewComment,
    });

    await expect(approvedCard).toBeVisible();
  });

  test("@smoke @admin admin can reject newly created review", async ({ browser, page }) => {
    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();

    const reviewName = uniqueText("PW Reject");
    const reviewComment = uniqueText("PW review reject");

    await createReviewViaUi(guestPage, {
      name: reviewName,
      comment: reviewComment,
      rating: 4,
    });

    await guestContext.close();

    await page.goto("/dashboard/admin/reviews");
    await page.getByTestId("admin-reviews-tab-pending").click();

    const card = page.getByTestId("admin-review-card").filter({
      hasText: reviewComment,
    });

    await expect(card).toBeVisible();

    await card.getByTestId("admin-review-reject").click();

    await expect(page.getByTestId("confirm-delete-modal")).toBeVisible();
    await page.getByTestId("confirm-delete-confirm").click();

    await expect(page.getByTestId("admin-reviews-toast")).toBeVisible();
    await expect(
      page.getByTestId("admin-review-card").filter({ hasText: reviewComment })
    ).toHaveCount(0);
  });

  test("@regression @admin admin can cancel reject modal", async ({ browser, page }) => {
    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();

    const reviewName = uniqueText("PW Cancel");
    const reviewComment = uniqueText("PW review cancel reject");

    await createReviewViaUi(guestPage, {
      name: reviewName,
      comment: reviewComment,
      rating: 3,
    });

    await guestContext.close();

    await page.goto("/dashboard/admin/reviews");
    await page.getByTestId("admin-reviews-tab-pending").click();

    const card = page.getByTestId("admin-review-card").filter({
      hasText: reviewComment,
    });

    await expect(card).toBeVisible();

    await card.getByTestId("admin-review-reject").click();

    await expect(page.getByTestId("confirm-delete-modal")).toBeVisible();

    await page.getByTestId("confirm-delete-cancel").click();

    await expect(page.getByTestId("confirm-delete-modal")).toHaveCount(0);
    await expect(card).toBeVisible();
  });

  test("@regression @admin admin can filter by rating", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    await page.getByTestId("admin-reviews-rating-filter").selectOption("5");

    await expect(page.getByTestId("admin-reviews-rating-filter")).toHaveValue("5");
  });

  test("@regression @admin admin can sort reviews", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    await page.getByTestId("admin-reviews-sort").selectOption("rating_desc");

    await expect(page.getByTestId("admin-reviews-sort")).toHaveValue("rating_desc");
  });

  test("@regression @admin admin can search reviews", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    await page.getByTestId("admin-reviews-search").fill("PW");

    await expect(page.getByTestId("admin-reviews-search")).toHaveValue("PW");
  });

  test("@regression @admin admin can export csv", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    const downloadPromise = page.waitForEvent("download");
    await page.getByTestId("admin-reviews-export-csv").click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toContain(".csv");
  });

  test("@regression @admin admin can preview attachment if present", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    const attachments = page.getByTestId("admin-review-attachment");

    if ((await attachments.count()) === 0) {
      test.skip();
    }

    await attachments.first().click();

    await expect(page.getByTestId("admin-attachment-preview-modal")).toBeVisible();
    await expect(page.getByTestId("admin-attachment-preview-image")).toBeVisible();

    await page.getByTestId("admin-attachment-preview-close").click();

    await expect(page.getByTestId("admin-attachment-preview-modal")).toHaveCount(0);
  });
});