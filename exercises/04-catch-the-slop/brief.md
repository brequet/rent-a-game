# 04 — Catch the slop

**Concept:** review
**Time:** 20-25 minutes
**Prerequisites:** `git checkout ex-04-start`

## What you do

The branch `feature/member-export` is waiting for review. It was written with an agent and the tests are green.

1. Review it yourself first — five minutes, no agent. Read the diff of `main...feature/member-export` and write down everything you could defend in a review comment.
2. Then ask the agent to review the same diff and compare the two lists.
3. Keep a final list of findings you can each explain.

## Constraints

- Read-only: do not modify files, do not commit, do not run commands that change repository state.
- Review the branch against `main`; leave unrelated history out of it.
- Style remarks are allowed only if you can show they hide a real risk.

## Levels

### Guided

Paste this into your agent:

```text
Review the diff `git diff main...feature/member-export`. Give me concrete findings with
file:line references. No pure style comments unless they hide a behavior change.
```

Then, after your own review:

```text
Here is my list: <paste yours>. Compare it with yours: what did I miss, what did you
miss, and for each finding, what concrete input or scenario triggers it?
```

Use read-only commands such as `git diff` and `git show` if you need to see a file on the branch.

### Open

Do the same review without the prompts, and choose your own way to reconcile your findings with the agent's.

### Stretch

Classify every finding: would you block the merge on it, ask for a fix before merge, or leave it as a nit? Be ready to defend the blocking ones.

## Done when

- You can explain each finding on your final list: how it happens and what the impact is.
- You know which findings only the agent found, and which only you found.

## Retro

- What did each of you miss, and what does that say about a single reviewer?
- Who owns the merge decision — and why?
