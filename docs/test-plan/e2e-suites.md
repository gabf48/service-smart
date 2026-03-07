# E2E Test Suites

## Overview

This project uses Playwright for end-to-end testing.

Current covered areas:
- guest reviews flow
- logged user reviews flow
- admin reviews moderation flow

Tests are tagged so they can be filtered locally and in CI.

---

## Tagging convention

The following tags are used in test titles:

- `@smoke` → critical fast checks
- `@regression` → broader validation suite
- `@guest` → guest user tests
- `@user` → logged-in user tests
- `@admin` → admin dashboard tests

Examples:

- `@smoke @guest guest can submit review`
- `@regression @admin admin can export csv`

---

## Local execution

### Run all tests

```bash
npx playwright test