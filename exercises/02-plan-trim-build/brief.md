# 02 — Plan, trim, build

**Concept:** steering, scope
**Start:** the delivered repository (`main`).

## What you do

Deliver the ticket in `tickets/T-101-loan-limit.md`.

Work in three passes:

1. **Plan.** Ask the agent for a plan only — no code, no edits.
2. **Trim.** Review the plan yourself. Cut what the ticket does not ask for, merge steps, delete anything you cannot explain.
3. **Build.** Hand back the trimmed plan and let the agent implement it, then run the tests.

The middle step is the point: the plan is yours before any code exists.

## Constraints

- The ticket is the specification: implement it, do not redesign it.
- Do not touch unrelated files.
- No new dependencies.
- Existing tests keep passing unchanged.
- Do not commit or push.

## Levels

### Guided

Prompts to use in order:

```text
Read tickets/T-101-loan-limit.md. Give me a plan only — no code: which files change,
what changes in each, and which tests you will add.
```

Review and edit the plan yourself, then:

```text
Here is the trimmed plan: <paste your version>. Implement exactly this plan and run
the tests.
```

```text
Show me the full diff. For each change, tell me which acceptance criterion it serves.
```

### Open

Run the whole ticket with a plan-first workflow of your own design, without the prompts above. The rule stays: no code until you have approved a plan you understand.

### Stretch

Before anything is implemented, write down the files you expect to change. Keep the final diff inside that list and be ready to justify anything outside it.

## Done when

- Every acceptance criterion in the ticket holds, with tests to show it.
- `npm test` and `npm run typecheck` are green.
- The diff is minimal: nothing in it that the ticket did not ask for.

## Retro

- What did you cut from the plan, and why?
- What appeared in the diff that you never asked for?
