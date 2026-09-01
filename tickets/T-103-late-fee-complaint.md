# T-103 — Late fee complaint: student charged 7.50 EUR

**Status:** open
**Area:** late fees
**Priority:** high
**Reported by:** support desk

## Complaint

Forwarded message from the member:

> I kept a premium game ten days past the due date — my own fault, I know.
> The game is listed with a replacement value of 20.00 EUR, and I am a student here.
> I was charged 7.50 EUR. At 0.50 EUR per day, ten days would be 5.00 EUR, and that is
> what I expected to pay. Could you check the calculation?

## What we know

- Member type: student.
- Game: premium, replacement value 2000 cents (20.00 EUR).
- Rented 2026-08-28T09:00:00Z, due 2026-09-04T09:00:00Z, returned 2026-09-14T08:45:00Z.
- Charged: 750 cents (7.50 EUR). Member expected: 500 cents (5.00 EUR).

## Repro

```text
A premium game with replacementValue 2000, returned ten whole days after dueAt by a
student member: returnGame reports 750 cents. The member expected 500 cents.
```

## Acceptance criteria

- [ ] A test reproduces the wrong charge against the current code.
- [ ] The fee for this scenario is 500 cents (5.00 EUR).
- [ ] `npm test` and `npm run typecheck` pass.

## Notes

- The reported figures are from support; do not adjust them to match the code.
- No new dependencies.
