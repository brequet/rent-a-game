# T-101 — Limit active loans per member

**Status:** open
**Area:** loans
**Priority:** normal

## Background

Twice this quarter a single member emptied most of the shelf: one account held six games at once. Support wants a hard ceiling so the rest of the members still have something to borrow.

## Requirement

A member may hold **at most 3 active loans at a time**.

- A loan is active while it has not been returned.
- Starting a rental that would take a member above the ceiling must fail: throw a `DomainError` with code `LOAN_LIMIT_REACHED`.
- Rentals that stay at or below the ceiling still succeed.
- Returned loans do not count, so a member who returns a game can rent again straight away.
- The ceiling is per member, not per game or per category.

## Dates

All dates in this feature and in its tests are UTC. Build test dates explicitly in UTC (for example `new Date('2026-08-01T00:00:00Z')`) so the tests do not depend on the machine timezone.

## Acceptance criteria

- [ ] A member with 2 active loans can start a third.
- [ ] A member with 3 active loans cannot start a fourth; the attempt throws `DomainError` with code `LOAN_LIMIT_REACHED`.
- [ ] A member with 3 active loans who returns one can start another one.
- [ ] Unit tests cover the limit, including the rejected fourth rental and the returned-loan case.
- [ ] `npm test` and `npm run typecheck` pass.

## Notes

- Do not change unrelated files or existing behavior.
- No new dependencies.
