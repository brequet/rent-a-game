import { describe, expect, it } from 'vitest';
import {
  PREMIUM_RATE_CENTS,
  STANDARD_RATE_CENTS,
  computeLateFee,
  daysLate,
  discountFactor,
} from '../src/domain/late-fees';
import type { Game, Loan, Member, MemberType } from '../src/domain/types';

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

function gameWith(overrides: Partial<Game> = {}): Game {
  return {
    id: 'G-1',
    title: 'Catan',
    category: 'standard',
    replacementValue: 2000,
    piecesComplete: true,
    ...overrides,
  };
}

function memberOfType(type: MemberType): Member {
  return { id: 'M-1', name: 'Camille Durand', email: 'camille.durand@example.com', type };
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

describe('discountFactor', () => {
  it('gives students half price', () => {
    expect(discountFactor('student')).toBe(0.5);
  });

  it('gives staff three quarters', () => {
    expect(discountFactor('staff')).toBe(0.75);
  });

  it('charges external members the full rate', () => {
    expect(discountFactor('external')).toBe(1);
  });
});

describe('computeLateFee', () => {
  it('charges nothing for an on-time return', () => {
    expect(computeLateFee(openLoan(), gameWith(), memberOfType('external'), dueAt)).toBe(0);
  });

  it('charges 100 cents per day for a standard game', () => {
    const fee = computeLateFee(openLoan(), gameWith(), memberOfType('external'), new Date('2026-08-11T00:00:00Z'));

    expect(fee).toBe(3 * STANDARD_RATE_CENTS);
  });

  it('charges 150 cents per day for a premium game', () => {
    const game = gameWith({ category: 'premium', replacementValue: 2000 });
    const fee = computeLateFee(openLoan(), game, memberOfType('external'), new Date('2026-08-11T00:00:00Z'));

    expect(fee).toBe(3 * PREMIUM_RATE_CENTS);
  });

  it('stops at half of the replacement value', () => {
    // 20 days at 100 cents would be 2000; the cap for this game is 600.
    const game = gameWith({ replacementValue: 1200 });
    const fee = computeLateFee(openLoan(), game, memberOfType('external'), new Date('2026-08-28T00:00:00Z'));

    expect(fee).toBe(600);
  });

  it('halves the fee for a student member', () => {
    // 4 days at 150 cents = 600, half is 300, well under the cap of 2000.
    const game = gameWith({ category: 'premium', replacementValue: 4000 });
    const fee = computeLateFee(openLoan(), game, memberOfType('student'), new Date('2026-08-12T00:00:00Z'));

    expect(fee).toBe(300);
  });

  it('takes three quarters for a staff member', () => {
    // 4 days at 100 cents = 400, three quarters is 300, under the cap of 1000.
    const game = gameWith({ replacementValue: 2000 });
    const fee = computeLateFee(openLoan(), game, memberOfType('staff'), new Date('2026-08-12T00:00:00Z'));

    expect(fee).toBe(300);
  });
});
