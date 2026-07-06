import { findGame, findLoan, findMember, saveLoan, type Store } from '../store';
import { isGameAvailable } from '../legacy/availability';
import { computeLateFee } from './late-fees';
import { DomainError, type Loan } from './types';

const DAY_MS = 86_400_000;
const LOAN_DURATION_DAYS = 7;

function nextLoanId(store: Store): string {
  let highest = 0;

  for (const loan of store.loans) {
    const numeric = Number.parseInt(loan.id.replace('L-', ''), 10);
    if (Number.isFinite(numeric) && numeric > highest) {
      highest = numeric;
    }
  }

  return `L-${highest + 1}`;
}

/** Opens a loan for `memberId` on `gameId`, starting at `at`. */
export function rentGame(store: Store, gameId: string, memberId: string, at: Date): Loan {
  const game = findGame(store, gameId);
  if (game === undefined) {
    throw new DomainError('NOT_FOUND', `No game with id ${gameId}`);
  }

  const member = findMember(store, memberId);
  if (member === undefined) {
    throw new DomainError('NOT_FOUND', `No member with id ${memberId}`);
  }

  if (!isGameAvailable(game, store.loans, store.reservations, at)) {
    throw new DomainError('GAME_UNAVAILABLE', `${game.title} cannot be lent at ${at.toISOString()}`);
  }

  const loan: Loan = {
    id: nextLoanId(store),
    gameId: game.id,
    memberId: member.id,
    rentedAt: at,
    dueAt: new Date(at.getTime() + LOAN_DURATION_DAYS * DAY_MS),
  };

  saveLoan(store, loan);
  return loan;
}

/** The loans a member still has to bring back. */
export function listActiveLoans(store: Store, memberId: string): Loan[] {
  return store.loans.filter((loan) => loan.memberId === memberId && loan.returnedAt === undefined);
}

export interface ReturnOptions {
  missingPieces?: boolean;
}

/** Closes a loan at the desk: records the return and reports the late fee in cents. */
export function returnGame(
  store: Store,
  loanId: string,
  returnedAt: Date,
  options: ReturnOptions = {}
): number {
  const loan = findLoan(store, loanId);
  if (loan === undefined) {
    throw new DomainError('NOT_FOUND', `No loan with id ${loanId}`);
  }

  if (loan.returnedAt !== undefined) {
    throw new DomainError('ALREADY_RETURNED', `Loan ${loanId} was returned already`);
  }

  const fee = computeLateFee(loan, returnedAt);

  loan.returnedAt = returnedAt;
  if (options.missingPieces !== undefined) {
    loan.missingPieces = options.missingPieces;
  }

  saveLoan(store, loan);

  return fee;
}
