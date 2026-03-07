import { test as base, expect } from "@playwright/test";
import path from "path";

export const test = base.extend({
  storageState: path.resolve("tests/e2e/.auth/user.json"),
});

export { expect };