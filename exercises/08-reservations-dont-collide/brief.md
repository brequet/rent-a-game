# 08 — Reservations that don't collide

**Concept:** domain modeling, time intervals
**Prerequisites:** `git switch workshop/start/ex-08`

## What you do

Implement `tickets/T-105-reservation-booking.md`. Add a reservation operation that checks the requested time range against reservations already recorded for that game. Make the interval contract explicit and prove the edge cases with tests.

## Constraints

- The ticket is the specification; do not change existing availability behavior.
- Keep the change to `src/domain/reservations.ts`, `src/domain/types.ts`, and `test/reservations.test.ts`.
- No new dependencies; do not commit or push.

## Levels

### Guided

Use these prompts in order:

```text
Read tickets/T-105-reservation-booking.md. List the invalid-date and interval cases as a test table and give me a plan only. Do not edit files yet.
```

```text
Write tests for invalid dates, reversed or zero-length ranges, overlapping ranges, adjacent ranges, reservations for another game, and an unknown game with invalid dates. Do not implement the feature yet.
```

```text
Implement the reservation operation and the smallest required error codes. Run the focused tests, then the full suite and typecheck.
```

```text
Show the full diff. For each comparison, explain why the two intervals conflict or do not conflict.
```

### Open

Deliver the ticket using your own plan and test strategy.

### Stretch

Add a table-driven test covering containment in both directions and both adjacency boundaries. Keep the public API and error behavior stable.

## Done when

- Overlapping reservations for the same game are rejected without changing the store.
- Adjacent reservations and reservations for a different game are accepted.
- Invalid dates and reversed or zero-length ranges fail with `INVALID_DATE_RANGE`.
- An unknown game fails with `NOT_FOUND`, even when the dates are invalid.
- `npm test` and `npm run typecheck` pass.

## Retro

- Which single comparison defines whether two ranges overlap?
- Which boundary case would your first implementation most likely have missed?
