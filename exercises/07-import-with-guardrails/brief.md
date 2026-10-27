# 07 — Import with guardrails

**Concept:** runtime validation, atomicity
**Time:** 30-40 minutes
**Prerequisites:** `git checkout ex-07-start`

## What you do

Implement the contract in `tickets/T-104-supplier-import.md`. Build a pure validator for supplier data: its input is untrusted `unknown`, and its output must report every invalid row and field. If any issue exists, return no game drafts. Do not edit the sample file or write anything to the store.

## Constraints

- Treat the ticket as the specification; do not redesign the result contract.
- Do not modify `data/supplier-import.json`.
- Keep the change to `src/import/supplier-import.ts` and `test/supplier-import.test.ts`.
- No new dependencies; do not commit or push.

## Levels

### Guided

Use these prompts in order:

```text
Read tickets/T-104-supplier-import.md. Give me a test matrix and a plan only. Do not edit files yet.
```

```text
Write the tests for valid input, malformed input, duplicate SKUs, and the supplied sample. Do not implement the validator yet.
```

```text
Implement the validator for unknown input. Keep it pure: no file writes and no store changes. Run the focused tests, then the full suite and typecheck.
```

```text
Show the full diff. For each invalid input, show the issue returned and confirm no games are returned when any issue exists.
```

### Open

Deliver the ticket with a workflow of your choice. Keep the validator pure and make the result contract explicit in tests.

### Stretch

Add malformed-root and malformed-row cases. Demonstrate that the function reports more than one issue in one run without throwing or coercing values.

## Done when

- The supplier sample produces actionable row/field issues.
- Valid input returns games; any issue returns no games.
- The input remains unchanged, and the returned drafts contain only the ticket's game fields.
- `npm test` and `npm run typecheck` pass.

## Retro

- Where did static TypeScript types stop protecting the program?
- What made the invalid result safe to act on?
