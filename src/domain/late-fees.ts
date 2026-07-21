import type { Game, Loan, Member, MemberType } from './types';

export const STANDARD_RATE_CENTS = 100;
export const PREMIUM_RATE_CENTS = 150;

const DAY_MS = 86_400_000;

export function dailyRateCents(game: Game): number {
  return game.category === 'premium' ? PREMIUM_RATE_CENTS : STANDARD_RATE_CENTS;
}

export function discountFactor(type: MemberType): number {
  switch (type) {
    case 'student':
      return 0.5;
    case 'staff':
      return 0.75;
    case 'external':
      return 1;
  }
}

/** Whole days between the due date and the return, clamped at zero. */
export function daysLate(loan: Loan, returnedAt: Date): number {
  const lateMs = returnedAt.getTime() - loan.dueAt.getTime();
  return Math.max(0, Math.ceil(lateMs / DAY_MS));
}

/**
 * Late fee in cents for a loan that came back at `returnedAt`.
 *
 * The parts: the daily rate for the game's category, the member's discount, and the cap at
 * half of the game's replacement value.
 */
export function computeLateFee(loan: Loan, game: Game, member: Member, returnedAt: Date): number {
  const days = daysLate(loan, returnedAt);
  const rate = dailyRateCents(game);
  const discount = discountFactor(member.type);
  const cap = Math.floor(game.replacementValue / 2);

  return Math.round(Math.min(days * rate * discount, cap));
}
