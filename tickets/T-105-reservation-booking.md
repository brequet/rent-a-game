# T-105 — Reject conflicting reservations

**Status:** open
**Area:** reservations
**Priority:** normal

## Requirement

Add `reserveGame(store, gameId, start, end)` in `src/domain/reservations.ts`.

- Error precedence: resolve the game first, then validate dates, then check conflicts. An unknown game fails with `DomainError` code `NOT_FOUND`, even if the dates are invalid.
- `start` and `end` must be valid `Date` timestamps (`getTime()` is finite), and the range must satisfy `start < end`. Otherwise fail with `INVALID_DATE_RANGE`.
- A reservation conflicts only with an existing reservation for the same game when their half-open ranges overlap: `existing.start < end && start < existing.end`.
- A conflict fails with `RESERVATION_CONFLICT`.
- Adjacent ranges are allowed: one reservation may end exactly when another starts.
- On success, create and save a reservation with a unique ID. On any failure, leave the store unchanged.
- Existing loan behavior and `isGameAvailable` are out of scope.

## Acceptance criteria

- [ ] Overlapping ranges are rejected, including when one range contains the other.
- [ ] Adjacent ranges and reservations for different games are accepted.
- [ ] Invalid dates and ranges fail with `INVALID_DATE_RANGE`; unknown games fail with `NOT_FOUND`.
- [ ] Error precedence: unknown game (`NOT_FOUND`), then invalid dates (`INVALID_DATE_RANGE`), then conflict (`RESERVATION_CONFLICT`).
- [ ] Failed requests do not add or alter reservations.
- [ ] Tests cover boundaries and the store state after success/failure.
- [ ] `npm test` and `npm run typecheck` pass.

## Notes

- Build all test dates explicitly in UTC.
- No new dependencies.
