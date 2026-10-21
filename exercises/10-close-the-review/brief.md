# 10 — Close the review

**Concept:** secure implementation, review follow-through
**Time:** 30-40 minutes
**Prerequisites:** `git checkout ex-10-start`; read this brief and `tickets/T-106-export-hardening.md` before switching branches.

## What you do

Turn the review findings from Exercise 4 into a safe implementation. The export code lives on `origin/feature/member-export`, so make a new local branch from that ref without changing the original branch:

```bash
git switch -c exercise/member-export-hardening origin/feature/member-export
```

Implement the ticket, add regression tests, and show how each review finding is addressed.

## Constraints

- Do not modify `feature/member-export` or push any branch.
- Keep the change to `src/export/member-export.ts` and `src/export/member-export.test.ts`.
- Do not change member records to make the export look cleaner.
- No new dependencies; do not commit.

## Levels

### Guided

Use these prompts in order:

```text
Read tickets/T-106-export-hardening.md. Give me a test matrix and a plan only. Do not edit files yet.
```

```text
Write regression tests for empty input, CSV-special characters, formula-leading values, stored-name preservation, and logs. Do not implement the fixes yet.
```

```text
Implement the ticket on this new branch. Run the focused tests, then the full suite and typecheck.
```

```text
Show the full diff and map every change to a ticket criterion and an Exercise 4 finding.
```

### Open

Implement the hardening ticket using your own plan and test strategy.

### Stretch

Add a test proving the original store and member records remain unchanged after export. Explain what spreadsheet-safe output means beyond ordinary CSV quoting.

## Done when

- The export works for an empty member list and preserves the fixed schema.
- CSV fields are correctly quoted, and spreadsheet formula-leading values are neutralized.
- Stored names are unchanged and email addresses are not logged.
- `npm test` and `npm run typecheck` pass on the new branch.

## Retro

- Which review finding was easiest to fix but hardest to verify?
- What does the test suite now protect that the original review tests did not?
