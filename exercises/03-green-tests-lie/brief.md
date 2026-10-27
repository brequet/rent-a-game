# 03 — Green tests lie

**Concept:** verification
**Prerequisites:** `git switch workshop/start/ex-03`

## What you do

Two related jobs.

**A. Audit the suite.** `test/returns.test.ts` was added by an agent in an earlier sprint, and everything is green. Read it and decide, test by test, which of them could ever fail. Then have the agent add the tests that are missing from the return flow.

**B. Close the complaint.** `tickets/T-103-late-fee-complaint.md` describes a wrong charge from support. Reproduce it with a failing test, fix the cause in the implementation (not in the test), then prove the test fails again when the fix is undone.

Order matters: no fix before you have a test that fails for the right reason.

## Constraints

- Existing tests must not be weakened, deleted or skipped to make things pass.
- Fix the cause, not the test.
- Do not touch unrelated files. No new dependencies.
- Do not commit or push.

## Levels

### Guided

Prompts to use in order:

```text
Read test/returns.test.ts. For each test, tell me which change to src/ would make it
fail, if any. Then list the behaviors of the return flow that no test could catch.
```

```text
Write the missing tests. Do not change the implementation.
```

```text
Write a test that reproduces tickets/T-103-late-fee-complaint.md. It must fail on the
current code. Do not touch the implementation yet.
```

```text
Now fix the cause in the implementation. Then undo the fix without touching the test
and run it again: it must fail the same way.
```

### Open

Reach the same two goals without the prompts: a returns suite where every test can fail, and a complaint closed by a test that goes red before the fix and green after.

### Stretch

Keep going until every branch of the return flow and of the late-fee calculation has at least one test that could fail.

## Done when

- A test fails before the fix, passes after, and fails again when the fix is undone.
- You can name tests that could never fail, and say what that tells you.
- `npm test` and `npm run typecheck` are green, with no test weakened.

## Retro

- Which existing test turned out to be useless, and what gave it away?
- What has to happen before you call a fix *verified*?
