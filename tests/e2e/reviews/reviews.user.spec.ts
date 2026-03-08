import { test, expect } from "./user.fixture";
import { cleanupPlaywrightReviews } from "../utils/testReviewCleanup";
import path from "path";

function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Logged user reviews", () => {
  test("@regression @user logged user can open review modal", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await expect(page.getByTestId("review-modal")).toBeVisible();
    await expect(page.getByTestId("review-modal-title")).toBeVisible();
  });

  test.beforeAll(async () => {
  await cleanupPlaywrightReviews("PW");
});

test.afterAll(async () => {
  await cleanupPlaywrightReviews("PW");
});

  test("@smoke @user logged user sees locked name", async ({ page }) => {
  await page.goto("/reviews");

  await page.getByTestId("reviews-open-modal").click();

  const nameInput = page.getByTestId("review-input-name");

  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeDisabled();
  await expect(nameInput).not.toHaveValue("");
});

  test("@regression @user logged user sees submit disabled before valid comment", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await expect(page.getByTestId("review-submit")).toBeDisabled();
    await expect(page.getByTestId("review-comment-helper")).toContainText("obligatoriu");
  });

  test("@regression @user logged user can select rating", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-star-4").click();

    await expect(page.getByTestId("review-rating-value")).toContainText("4/5");
  });

  test("@smoke @user logged user can submit review", async ({ page }) => {
    const comment = uniqueText("PW logged user review");

    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-star-5").click();
    await page.getByTestId("review-input-comment").fill(comment);

    await expect(page.getByTestId("review-submit")).toBeEnabled();

    await page.getByTestId("review-submit").click();

    await expect(page.getByTestId("review-modal")).not.toBeVisible();
    await expect(page.getByTestId("reviews-page-notice")).toBeVisible();
    await expect(page.getByTestId("reviews-page-notice-text")).toContainText("Mulțumim");
  });

  test("@regression @user logged user can upload and remove image preview", async ({ page }) => {
    const imagePath = path.resolve("tests/fixtures/test-image.jpg");

    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-input-files").setInputFiles(imagePath);

    await expect(page.getByTestId("review-files-previews")).toBeVisible();
    await expect(page.getByTestId("review-preview-item")).toHaveCount(1);

    await page.getByTestId("review-preview-remove").click();

    await expect(page.getByTestId("review-preview-item")).toHaveCount(0);
  });

  test("@regression @user logged user can close page notice", async ({ page }) => {
    const comment = uniqueText("PW notice close review");

    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();
    await page.getByTestId("review-star-5").click();
    await page.getByTestId("review-input-comment").fill(comment);

    await page.getByTestId("review-submit").click();

    await expect(page.getByTestId("reviews-page-notice")).toBeVisible();

    await page.getByTestId("reviews-page-notice-close").click();

    await expect(page.getByTestId("reviews-page-notice")).toHaveCount(0);
  });

test("@regression @user logged user can close review modal", async ({ page }) => {
  await page.goto("/reviews");

  await page.getByTestId("reviews-open-modal").click();
  await expect(page.getByTestId("review-modal")).toBeVisible();

  await page.getByTestId("review-modal-close").click();

  await expect(page.getByTestId("review-modal")).toHaveCount(0);
});

test("@regression @user logged user can preview multiple images", async ({ page }) => {
  const file1 = path.resolve("tests/fixtures/test-image-1.jpg");
  const file2 = path.resolve("tests/fixtures/test-image-2.jpg");

  await page.goto("/reviews");
  await page.getByTestId("reviews-open-modal").click();

  await page.getByTestId("review-input-files").setInputFiles([file1, file2]);

  await expect(page.getByTestId("review-preview-item")).toHaveCount(2);
});
});