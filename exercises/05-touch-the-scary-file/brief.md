# 05 — Touch the scary file

**Concept:** leverage with a safety net
**Start:** the delivered repository (`main`).

## What you do

`src/legacy/availability.ts` works, and nobody wants to be the one who changes it. Its behavior is described only by itself.

1. **Pin it.** Read the file until you can list every outcome it can produce, with a concrete scenario for each one — including the edge cases you find. Turn that list into tests written against the current implementation. They must all pass before any refactor.
2. **Refactor it.** Rewrite the file for readability behind the same public API. The tests are the proof that behavior is unchanged, and they must not be edited to fit the new code.
3. **Explain it.** Each test should have a one-line reason to exist, and you should be able to say what it protects.

## Constraints

- The public API stays exactly as it is: same exported signature, same semantics.
- Once written, the tests are the contract: no edits to them during the refactor.
- Do not touch unrelated files. No new dependencies.
- Do not commit or push.

## Levels

### Guided

Prompts to use in order:

```text
Read src/legacy/availability.ts. List every outcome it can produce for a game at a
given moment, with a concrete scenario for each — including every branch and boundary
you find. Do not change the file.
```

```text
Turn that list into tests written against the current implementation. All of them must
pass. Do not change src/legacy/availability.ts yet.
```

```text
Now refactor src/legacy/availability.ts for readability. Same public API, same behavior.
Do not edit the tests; they must stay green.
```

### Open

Same goal, your own workflow: tests that pin the current behavior, then a refactor that provably does not change it.

### Stretch

Run the same test file against the old and the new implementation and show that both are green, with no test edits.

## Done when

- The tests pass against the original file and against the refactor.
- Every test has a one-line reason, and you can explain the scenario it exercises.
- `npm test` and `npm run typecheck` are green.

## Retro

- What protected the behavior while you changed the file?
- What in that file (or in your tests) would you still not trust?
