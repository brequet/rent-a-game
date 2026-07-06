import { describe, expect, it } from 'vitest';
import {
  LATE_FEE_CAP_CENTS,
  LATE_FEE_PER_DAY_CENTS,
  computeLateFee,
  daysLate,
} from '../src/domain/late-fees';
import type { Loan } from '../src/domain/types';

const dueAt = new Date('2026-08-08T00:00:00Z');

function openLoan(): Loan {
  return {
    id: 'L-1',
    gameId: 'G-1',
    memberId: 'M-1',
    rentedAt: new Date('2026-08-01T00:00:00Z'),
    dueAt,
  };
}

describe('daysLate', () => {
  it('is zero when the game is back on the due date', () => {
    expect(daysLate(openLoan(), dueAt)).toBe(0);
  });

  it('is zero when the game is back early', () => {
    expect(daysLate(openLoan(), new Date('2026-08-05T00:00:00Z'))).toBe(0);
  });

  it('counts whole days and rounds a started day up', () => {
    expect(daysLate(openLoan(), new Date('2026-08-11T00:00:00Z'))).toBe(3);
    expect(daysLate(openLoan(), new Date('2026-08-11T09:30:00Z'))).toBe(4);
  });
});

describe('computeLateFee', () => {
  it('charges nothing for an on-time return', () => {
    expect(computeLateFee(openLoan(), dueAt)).toBe(0);
  });

  it('charges 50 cents per late day', () => {
    const fee = computeLateFee(openLoan(), new Date('2026-08-11T00:00:00Z'));

    expect(fee).toBe(3 * LATE_FEE_PER_DAY_CENTS);
  });

  it('stops at 5 EUR per loan', () => {
    // 20 days at 50 cents would be 1000; the flat cap is 500.
    const fee = computeLateFee(openLoan(), new Date('2026-08-28T00:00:00Z'));

    expect(fee).toBe(LATE_FEE_CAP_CENTS);
  });
});
