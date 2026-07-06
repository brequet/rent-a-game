import type { Loan } from './types';

export const LATE_FEE_PER_DAY_CENTS = 50;
export const LATE_FEE_CAP_CENTS = 500;

const DAY_MS = 86_400_000;

/** Whole days between the due date and the return, clamped at zero. */
export function daysLate(loan: Loan, returnedAt: Date): number {
  const lateMs = returnedAt.getTime() - loan.dueAt.getTime();
  return Math.max(0, Math.ceil(lateMs / DAY_MS));
}

/** Late fee in cents: 50 cents per late day, never more than 5 EUR per loan. */
export function computeLateFee(loan: Loan, returnedAt: Date): number {
  const days = daysLate(loan, returnedAt);
  return Math.min(days * LATE_FEE_PER_DAY_CENTS, LATE_FEE_CAP_CENTS);
}
