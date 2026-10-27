# 10 — Close the review

**Concept:** secure implementation, review follow-through
**Prerequisites:** `git switch workshop/start/ex-10`; read this brief and `tickets/T-106-export-hardening.md` before switching branches.

## What you do

Turn the review findings from Exercise 4 into a safe implementation. The export code lives on local branch `feature/member-export`, so make a new local branch from it without changing the original branch:

```bash
git switch -c exercise/member-export-hardening feature/member-export
```

Implement the ticket, add regression tests, and show how each review finding is addressed. For formula safety, name the target spreadsheet and use case, then choose a mitigation for that target and explain it. CSV output tests alone do not prove safety for every spreadsheet.

## Constraints

- Do not modify `feature/member-export` or push any branch.
- Keep the change to `src/export/member-export.ts` and `src/export/member-export.test.ts`.
- Do not change member records to make the export look cleaner.
- No new dependencies; do not commit.

## Levels

### Guided

Use these prompts in order:

```text
Read tickets/T-106-export-hardening.md. Target: <spreadsheet and use case>. List mitigation options for that target with trade-offs. Give me a test matrix and a plan only. Do not edit files yet.
```

```text
Write regression tests for empty input, CSV-special characters, stored-name preservation, logs, and exact serialized output for formula-leading `=`, `+`, `-`, and `@` values. Do not implement the fixes yet.
```

```text
Implement the ticket on this new branch with the mitigation I chose. Run the focused tests, then the full suite and typecheck.
```

```text
Show the full diff, map every change to a ticket criterion and an Exercise 4 finding, and explain the mitigation for the target I named.
```

### Open

Implement the hardening ticket using your own plan and test strategy.

### Stretch

Add a test proving the original store and member records remain unchanged after export. Explain what formula safety means for your named target beyond ordinary CSV quoting.

## Done when

- The export works for an empty member list and preserves the fixed schema.
- CSV fields are correctly quoted.
- The target spreadsheet and use case are named, and the mitigation is explained for that target.
- Fields whose first non-whitespace character is `=`, `+`, `-`, or `@` are checked by exact-output tests.
- Stored names are unchanged and email addresses are not logged.
- `npm test` and `npm run typecheck` pass on the new branch.

## Retro

- Which review finding was easiest to fix but hardest to verify?
- What does the test suite now protect that the original review tests did not?
