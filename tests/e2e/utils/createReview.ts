import { APIRequestContext } from "@playwright/test";

export async function createReview(request: APIRequestContext) {
  const res = await request.post("/api/reviews", {
    data: {
      display_name: `PW Test ${Date.now()}`,
      comment: "Automated review for moderation test",
      rating: 5,
      email: "playwright@test.com",
      phone: "",
    },
  });

  if (!res.ok()) {
    throw new Error(`Failed to create review: ${res.status()} ${await res.text()}`);
  }

  const json = await res.json();
  return json.id; // presupune că endpointul returnează review-ul creat
}