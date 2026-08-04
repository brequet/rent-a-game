import { findGame, findLoan, findMember, saveLoan, type Store } from '../store';
import { computeLateFee } from './late-fees';
import { DomainError } from './types';

export interface ReturnOptions {
  missingPieces?: boolean;
}

/**
 * Closes a loan at the desk: records the return and reports the late fee in cents.
 */
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

  const game = findGame(store, loan.gameId);
  if (game === undefined) {
    throw new DomainError('NOT_FOUND', `No game with id ${loan.gameId}`);
  }

  const member = findMember(store, loan.memberId);
  if (member === undefined) {
    throw new DomainError('NOT_FOUND', `No member with id ${loan.memberId}`);
  }

  const fee = computeLateFee(loan, game, member, returnedAt);

  loan.returnedAt = returnedAt;
  if (options.missingPieces !== undefined) {
    loan.missingPieces = options.missingPieces;
  }

  saveLoan(store, loan);

  return fee;
}
