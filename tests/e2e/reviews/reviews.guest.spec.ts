import { test, expect } from "@playwright/test";

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
});