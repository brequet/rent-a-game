import { isGameAvailable } from '../legacy/availability';
import { findGame, findMember, saveLoan, type Store } from '../store';
import { DomainError, type Loan } from './types';

const DAY_MS = 86_400_000;

const LOAN_DURATION_DAYS = 7;

/** The loans a member still has to bring back. */
export function listActiveLoans(store: Store, memberId: string): Loan[] {
  return store.loans.filter((loan) => loan.memberId === memberId && loan.returnedAt === undefined);
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
    throw new DomainError(
      'GAME_UNAVAILABLE',
      `${game.title} cannot be lent at ${at.toISOString()}`
    );
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

/** Ids come from the highest number already in the store. */
function nextLoanId(store: Store): string {
  let maxId = 0;

  for (const loan of store.loans) {
    const parsedId = Number.parseInt(loan.id.replace('L-', ''), 10);
    if (Number.isFinite(parsedId) && parsedId > maxId) {
      maxId = parsedId;
    }
  }

  return `L-${maxId + 1}`;
}
