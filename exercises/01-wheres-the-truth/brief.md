# 01 — Where's the truth?

**Concept:** context, tools, evidence
**Prerequisites:** fresh extraction of the supplied workshop ZIP.

## What you do

You need one concrete domain answer, and you need it to come from evidence rather than from memory or from prose.

Pick a question about how the app behaves, ask your agent, then check the answer yourself against the repository. The interesting part is not the number — it is where the number came from.

## Constraints

- Read-only: do not create, modify or delete any file, and do not let the agent do so.
- Do not commit.
- The answer must cite code (`file:line` plus a quoted line), not a document.

## Levels

### Guided

Paste this into your agent:

```text
A standard game is returned 3 days late by an external member. How much is the late fee?
Answer with `file:line` references and quote the code.
```

Then open the cited files yourself and follow the calculation line by line.

### Open

Pick your own scenario about pricing or borrowing, and set your own rule: the answer is only accepted with `file:line` evidence. Let the agent choose what to inspect.

### Stretch

List the edge cases the late-fee rule implies, then check the test suite: which of those edge cases have a test, and which have none?

## Done when

- The answer cites at least one `file:line` reference with the quoted code.
- You can trace every number in the answer back to a line of code or to stored data.

## Retro

- How did you check the answer you got?
- Where could an answer have gone wrong without you noticing?
