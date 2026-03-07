# Reviews Test Cases

## Overview
Feature: Reviews submission and moderation

Pages involved:
- Public Reviews page
- Admin Reviews dashboard

---

| ID | Title | Preconditions | Steps | Expected Result | Automated |
|----|------|---------------|------|----------------|-----------|
| REV-001 | Submit review as guest | User is on Reviews page | Open review modal, fill required fields, submit | Success message appears and review is saved as pending | Yes |
| REV-002 | Review is hidden until approval | Review submitted | Check public reviews list | Review is not visible publicly before admin approval | Yes |
| REV-003 | Admin sees review in pending | Admin logged in | Open Admin → Reviews | New review appears in Pending list | Yes |
| REV-004 | Admin approves review | Review in Pending | Click Approve | Review moves to Approved tab | Yes |
| REV-005 | Approved review appears publicly | Review approved | Open public Reviews page | Review is visible | Yes |
| REV-006 | Admin rejects review | Review in Pending | Click Reject | Review is deleted or removed | Yes |
| REV-007 | Required fields validation | Open review modal | Submit empty form | Validation errors displayed | Yes |
| REV-008 | Search review in admin | Admin reviews page | Search by name/email/comment | Correct review filtered | Optional |
| REV-009 | Bulk approve reviews | Multiple reviews selected | Click Approve selected | All selected reviews move to Approved | Optional |
| REV-010 | Export reviews CSV | Admin reviews page | Click Export CSV | CSV file downloaded | Optional |