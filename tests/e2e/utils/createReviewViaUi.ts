import { expect, Page } from "@playwright/test";

export async function createReviewViaUi(
  page: Page,
  {
    name,
    comment,
    rating = 5,
  }: {
    name: string;
    comment: string;
    rating?: 1 | 2 | 3 | 4 | 5;
  }
) {
  await page.goto("/reviews");

  await page.getByTestId("reviews-open-modal").click();
  await expect(page.getByTestId("review-modal")).toBeVisible();

  await page.getByTestId(`review-star-${rating}`).click();

  const nameInput = page.getByTestId("review-input-name");

  if (await nameInput.isEnabled()) {
    await nameInput.fill(name);
  }

  await page.getByTestId("review-input-comment").fill(comment);

  await expect(page.getByTestId("review-submit")).toBeEnabled();
  await page.getByTestId("review-submit").click();

  await expect(page.getByTestId("review-modal")).not.toBeVisible();
  await expect(page.getByTestId("reviews-page-notice")).toBeVisible();
}