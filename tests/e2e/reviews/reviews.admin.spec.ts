import { test, expect } from "./admin.fixture";
import { createReviewViaUi } from "../utils/createReviewViaUi";
import path from "path";

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

    const approvedTab = page.getByTestId("admin-reviews-tab-approved");
    const pendingTab = page.getByTestId("admin-reviews-tab-pending");

    await expect(approvedTab).toBeVisible();
    await expect(pendingTab).toBeVisible();

    await approvedTab.click();
    await pendingTab.click();
  });

  test("@smoke @admin admin can approve newly created review", async ({ browser, page }) => {
    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();

    const reviewComment = uniqueText("PW review approve");

    await createReviewViaUi(guestPage, {
      name: uniqueText("PW Approve"),
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

    const reviewComment = uniqueText("PW review reject");

    await createReviewViaUi(guestPage, {
      name: uniqueText("PW Reject"),
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

    const reviewComment = uniqueText("PW review cancel reject");

    await createReviewViaUi(guestPage, {
      name: uniqueText("PW Cancel"),
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

  test("@regression @admin admin can clear search", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    await page.getByTestId("admin-reviews-search").fill("PW");
    await expect(page.getByTestId("admin-reviews-search")).toHaveValue("PW");

    await page.getByTestId("admin-reviews-search").fill("");
    await expect(page.getByTestId("admin-reviews-search")).toHaveValue("");
  });

  test("@regression @admin admin can export csv", async ({ page }) => {
    await page.goto("/dashboard/admin/reviews");

    const downloadPromise = page.waitForEvent("download");
    await page.getByTestId("admin-reviews-export-csv").click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toContain(".csv");
  });

test("@regression @admin admin can preview attachment", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const reviewComment = uniqueText("PW attachment preview");
  const file = path.resolve("tests/fixtures/test-image-1.jpg");

  await createReviewViaUi(guestPage, {
    name: uniqueText("PW Attachment"),
    comment: reviewComment,
    rating: 5,
    files: [file],
  });

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  const card = page.getByTestId("admin-review-card").filter({
    hasText: reviewComment,
  });

  await expect(card).toBeVisible();

  await card.getByTestId("admin-review-attachment").first().click();

  await expect(page.getByTestId("admin-attachment-preview-modal")).toBeVisible();
  await expect(page.getByTestId("admin-attachment-preview-image")).toBeVisible();

  await page.getByTestId("admin-attachment-preview-close").click();

  await expect(page.getByTestId("admin-attachment-preview-modal")).toHaveCount(0);
});

  test("@regression @admin admin can close toast", async ({ browser, page }) => {
    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();

    const reviewComment = uniqueText("PW review toast");

    await createReviewViaUi(guestPage, {
      name: uniqueText("PW Toast"),
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

    await page.getByTestId("admin-reviews-toast-close").click();

    await expect(page.getByTestId("admin-reviews-toast")).toHaveCount(0);
  });

  test("@regression @admin admin can select and clear selection", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const reviewComment = uniqueText("PW select clear");

  await createReviewViaUi(guestPage, {
    name: uniqueText("PW Select"),
    comment: reviewComment,
    rating: 5,
  });

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  const card = page.getByTestId("admin-review-card").filter({ hasText: reviewComment });
  await expect(card).toBeVisible();

  const checkbox = card.getByTestId("admin-review-checkbox");
  await checkbox.check();

  await page.getByTestId("admin-reviews-clear-selection").click();

  await expect(checkbox).not.toBeChecked();
});

  test("@regression @admin admin can bulk approve selected reviews", async ({ browser, page }) => {
    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();

    const reviewComment1 = uniqueText("PW bulk approve 1");
    const reviewComment2 = uniqueText("PW bulk approve 2");

    await createReviewViaUi(guestPage, {
      name: uniqueText("PW Bulk 1"),
      comment: reviewComment1,
      rating: 5,
    });

    await createReviewViaUi(guestPage, {
      name: uniqueText("PW Bulk 2"),
      comment: reviewComment2,
      rating: 5,
    });

    await guestContext.close();

    await page.goto("/dashboard/admin/reviews");
    await page.getByTestId("admin-reviews-tab-pending").click();

    const card1 = page.getByTestId("admin-review-card").filter({ hasText: reviewComment1 });
    const card2 = page.getByTestId("admin-review-card").filter({ hasText: reviewComment2 });

    await expect(card1).toBeVisible();
    await expect(card2).toBeVisible();

    await card1.getByTestId("admin-review-checkbox").check();
    await card2.getByTestId("admin-review-checkbox").check();

    await page.getByTestId("admin-reviews-bulk-approve").click();

    await expect(page.getByTestId("admin-reviews-toast")).toBeVisible();
  });

  test("@regression @admin admin can bulk delete selected reviews", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const reviewComment = uniqueText("PW bulk delete");

  await createReviewViaUi(guestPage, {
    name: uniqueText("PW Bulk Delete"),
    comment: reviewComment,
    rating: 4,
  });

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  const card = page.getByTestId("admin-review-card").filter({ hasText: reviewComment });

  await expect(card).toBeVisible();

  await card.getByTestId("admin-review-checkbox").check();

  await page.getByTestId("admin-reviews-bulk-delete").click();

  await expect(page.getByTestId("admin-reviews-toast")).toBeVisible();

  await expect(
    page.getByTestId("admin-review-card").filter({ hasText: reviewComment })
  ).toHaveCount(0);
});

 test("@regression @admin admin pagination works", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const base = uniqueText("PW pagination");

  for (let i = 1; i <= 7; i++) {
    await createReviewViaUi(guestPage, {
      name: uniqueText(`PW Pagination ${i}`),
      comment: `${base} ${i}`,
      rating: 5,
    });
  }

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  await expect(page.getByTestId("admin-reviews-pagination")).toBeVisible();

  const currentBefore = await page.getByTestId("admin-pagination-current").textContent();
  const nextBtn = page.getByTestId("admin-pagination-next");

  await expect(nextBtn).toBeEnabled();
  await nextBtn.click();

  const currentAfter = await page.getByTestId("admin-pagination-current").textContent();

  expect(currentAfter).not.toBe(currentBefore);
});

  test("@regression @admin admin pagination buttons state is correct", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const base = uniqueText("PW pagination state");

  for (let i = 1; i <= 7; i++) {
    await createReviewViaUi(guestPage, {
      name: uniqueText(`PW Pagination State ${i}`),
      comment: `${base} ${i}`,
      rating: 4,
    });
  }

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  await expect(page.getByTestId("admin-reviews-pagination")).toBeVisible();

  await expect(page.getByTestId("admin-pagination-prev")).toBeDisabled();
  await expect(page.getByTestId("admin-pagination-next")).toBeEnabled();

  await page.getByTestId("admin-pagination-next").click();

  await expect(page.getByTestId("admin-pagination-prev")).toBeEnabled();
});

  test("@regression @admin admin can move approved review back to pending", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const reviewComment = uniqueText("PW move to pending");

  await createReviewViaUi(guestPage, {
    name: uniqueText("PW Move"),
    comment: reviewComment,
    rating: 5,
  });

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  const pendingCard = page.getByTestId("admin-review-card").filter({ hasText: reviewComment });
  await expect(pendingCard).toBeVisible();

  await pendingCard.getByTestId("admin-review-approve").click();
  await expect(page.getByTestId("admin-reviews-toast")).toBeVisible();

  await page.getByTestId("admin-reviews-tab-approved").click();

  const approvedCard = page.getByTestId("admin-review-card").filter({ hasText: reviewComment });
  await expect(approvedCard).toBeVisible();

  await approvedCard.getByTestId("admin-review-move-pending").click();
  await expect(page.getByTestId("admin-reviews-toast")).toBeVisible();

  await page.getByTestId("admin-reviews-tab-pending").click();
  await expect(page.getByTestId("admin-review-card").filter({ hasText: reviewComment })).toBeVisible();
});

test("@regression @admin admin can select all visible and clear selection", async ({ browser, page }) => {
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  const reviewComment1 = uniqueText("PW select page 1");
  const reviewComment2 = uniqueText("PW select page 2");

  await createReviewViaUi(guestPage, {
    name: uniqueText("PW Select Page 1"),
    comment: reviewComment1,
    rating: 5,
  });

  await createReviewViaUi(guestPage, {
    name: uniqueText("PW Select Page 2"),
    comment: reviewComment2,
    rating: 4,
  });

  await guestContext.close();

  await page.goto("/dashboard/admin/reviews");
  await page.getByTestId("admin-reviews-tab-pending").click();

  await expect(page.getByTestId("admin-review-card").filter({ hasText: reviewComment1 })).toBeVisible();
  await expect(page.getByTestId("admin-review-card").filter({ hasText: reviewComment2 })).toBeVisible();

  await page.getByTestId("admin-reviews-select-page").click();

  const checkboxes = page.getByTestId("admin-review-checkbox");
  await expect(checkboxes.first()).toBeChecked();

  await page.getByTestId("admin-reviews-clear-selection").click();
  await expect(checkboxes.first()).not.toBeChecked();
});

test("@regression @admin admin can reset filters", async ({ page }) => {
  await page.goto("/dashboard/admin/reviews");

  await page.getByTestId("admin-reviews-search").fill("PW");
  await page.getByTestId("admin-reviews-rating-filter").selectOption("5");
  await page.getByTestId("admin-reviews-sort").selectOption("rating_desc");

  // reset manual (clear search + set rating all + set newest)
  await page.getByTestId("admin-reviews-search").fill("");
  await page.getByTestId("admin-reviews-rating-filter").selectOption("all");
  await page.getByTestId("admin-reviews-sort").selectOption("newest");

  await expect(page.getByTestId("admin-reviews-search")).toHaveValue("");
  await expect(page.getByTestId("admin-reviews-rating-filter")).toHaveValue("all");
  await expect(page.getByTestId("admin-reviews-sort")).toHaveValue("newest");
});
});