import dotenv from "dotenv";

dotenv.config({ path: ".env.playwright" });

export function getAdminCredentials() {
  const email = process.env.PLAYWRIGHT_ADMIN_EMAIL;
  const password = process.env.PLAYWRIGHT_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Missing PLAYWRIGHT_ADMIN_EMAIL or PLAYWRIGHT_ADMIN_PASSWORD in .env.playwright"
    );
  }

  return { email, password };
}

export function getUserCredentials() {
  const email = process.env.PLAYWRIGHT_USER_EMAIL;
  const password = process.env.PLAYWRIGHT_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      `Missing user credentials. EMAIL=${email ? "ok" : "missing"} PASSWORD=${password ? "ok" : "missing"}`
    );
  }

  return { email, password };
}