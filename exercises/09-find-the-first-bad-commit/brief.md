# 09 — Find the first bad commit

**Concept:** Git history, causal debugging
**Prerequisites:** `git switch workshop/start/ex-09`

## What you do

Use `tickets/T-103-late-fee-complaint.md` as a regression report. Find the first commit where the reported calculation changes from the expected result to the current result. Reproduce the behavior, use Git history tools to narrow the cause, and report the commit with evidence. Do not fix the code.

## Constraints

- This is an investigation, not an implementation task.
- You may create one temporary, untracked test at `test/late-fee-bisect.test.ts`; remove it before finishing.
- Do not edit production code, commit, or push.
- Run `git bisect reset` when finished, and confirm the checkout is back where it started.

## Levels

### Guided

Use these prompts in order:

```text
Read tickets/T-103-late-fee-complaint.md. Write a temporary test for the reported behavior that can run at both the earlier and current versions of the fee function. Do not edit production code.
```

```text
Run the test at the current revision. Find a revision where it passes, then use git bisect to identify the first bad commit. Record each good/bad result.
```

```text
Verify the result by running the same test at the commit immediately before and at the commit you identified. Then run git bisect reset.
```

```text
Show the commit and the evidence for it. Do not describe or apply a fix.
```

### Open

Investigate the regression using Git history and a reproducible check. Keep the tree unchanged when you finish.

### Stretch

Automate the bisection with `git bisect run`. Explain how the script distinguishes a real failure from a test or environment error.

## Done when

- The same test passes before the regression and fails at it.
- You identify the first bad commit and cite the changed file/symbol that supports your conclusion.
- The temporary test is removed, `git bisect reset` has run, and no production file changed.

## Retro

- What did the test make observable that reading the commit list alone could not?
- How did you know a bisect result was trustworthy?
