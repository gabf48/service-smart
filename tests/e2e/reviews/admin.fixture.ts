import { test as base, expect } from "@playwright/test";
import path from "path";

export const test = base.extend({
  storageState: path.join(__dirname, "../.auth/admin.json"),
});

export { expect };