import { test, expect } from "@playwright/test";
import { cleanupPlaywrightReviews } from "../utils/testReviewCleanup";
import path from "path";


function uniqueText(prefix: string) {
  return `${prefix} ${Date.now()}`;
}

test.describe("Guest reviews", () => {
  test("@smoke @guest guest can open review modal", async ({ page }) => {
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

  test("@smoke @guest guest sees validation for empty review", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await expect(page.getByTestId("review-submit")).toBeDisabled();
    await expect(page.getByTestId("review-comment-helper")).toContainText("obligatoriu");
  });

  test("@regression @guest guest can change rating", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-star-3").click();
    await expect(page.getByTestId("review-rating-value")).toContainText("3/5");

    await page.getByTestId("review-star-5").click();
    await expect(page.getByTestId("review-rating-value")).toContainText("5/5");
  });

  test("@smoke @guest guest can submit review", async ({ page }) => {
    const name = uniqueText("Playwright Guest");
    const comment = uniqueText("Automated guest review");

    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-star-5").click();
    await page.getByTestId("review-input-name").fill(name);
    await page.getByTestId("review-input-comment").fill(comment);

    await expect(page.getByTestId("review-submit")).toBeEnabled();

    await page.getByTestId("review-submit").click();

    await expect(page.getByTestId("review-modal")).not.toBeVisible();
    await expect(page.getByTestId("reviews-page-notice")).toBeVisible();
    await expect(page.getByTestId("reviews-page-notice-text")).toContainText("Mulțumim");
  });

  test("@regression @guest guest can submit with default rating (no star click)", async ({ page }) => {
  await page.goto("/reviews");

  await page.getByTestId("reviews-open-modal").click();

  await expect(page.getByTestId("review-rating-value")).toContainText("5/5");

  await page.getByTestId("review-input-name").fill("Playwright Guest");
  await page.getByTestId("review-input-comment").fill("Test comment");

  await expect(page.getByTestId("review-submit")).toBeEnabled();
});

  test("@regression @guest guest can close review modal", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();
    await expect(page.getByTestId("review-modal")).toBeVisible();

    await page.getByTestId("review-modal-close").click();

    await expect(page.getByTestId("review-modal")).toHaveCount(0);
  });

  test("@regression @guest guest can update comment counter", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-input-comment").fill("abcde");

    await expect(page.getByTestId("review-comment-counter")).toContainText("5/");
  });

  test("@regression @guest guest can upload and remove image preview", async ({ page }) => {
    const imagePath = path.resolve("tests/fixtures/test-image.jpg");

    await page.goto("/reviews");

    await page.getByTestId("reviews-open-modal").click();

    await page.getByTestId("review-input-files").setInputFiles(imagePath);

    await expect(page.getByTestId("review-files-previews")).toBeVisible();
    await expect(page.getByTestId("review-preview-item")).toHaveCount(1);

    await page.getByTestId("review-preview-remove").click();

    await expect(page.getByTestId("review-preview-item")).toHaveCount(0);
  });


test("@regression @guest guest cannot exceed max files", async ({ page }) => {
  await page.goto("/reviews");
  await page.getByTestId("reviews-open-modal").click();

  const files = [
    path.resolve("tests/fixtures/test-image-1.jpg"),
    path.resolve("tests/fixtures/test-image-2.jpg"),
    path.resolve("tests/fixtures/test-image-3.jpg"),
    path.resolve("tests/fixtures/test-image-4.jpg"),
    path.resolve("tests/fixtures/test-image-5.jpg"),
    path.resolve("tests/fixtures/test-image-1.jpg"),
    path.resolve("tests/fixtures/test-image-2.jpg"),
  ];

  await page.getByTestId("review-input-files").setInputFiles(files);

  const previews = page.getByTestId("review-preview-item");
  const count = await previews.count();

  // aplicația ta are limită MAX_FILES = 5
  expect(count).toBeLessThanOrEqual(5);
});

test("@regression @guest guest can preview multiple images", async ({ page }) => {
  await page.goto("/reviews");
  await page.getByTestId("reviews-open-modal").click();

  await page.getByTestId("review-input-files").setInputFiles([
    path.resolve("tests/fixtures/test-image-1.jpg"),
    path.resolve("tests/fixtures/test-image-2.jpg"),
  ]);

  await expect(page.getByTestId("review-preview-item")).toHaveCount(2);
});

});