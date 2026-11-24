import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.playwright" });

const isCI = !!process.env.CI;
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests/e2e",

  globalSetup: "./tests/e2e/global.setup.ts",

  timeout: 30_000,
  expect: { timeout: 10_000 },

  fullyParallel: true,

  retries: isCI ? 1 : 0,

  workers: isCI ? 1 : undefined,

  reporter: isCI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html"]],

  use: {
    baseURL,
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    storageState: "./tests/e2e/.auth/admin.json",
  },

  webServer: isCI
    ? undefined
    : {
        command: "npm run build && npm run start",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      testIgnore: [/.*auth\.setup\.ts/, /.*user\.setup\.ts/],
    },
  ],
});