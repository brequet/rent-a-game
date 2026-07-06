import type { Game, Loan, Member, Reservation } from './domain/types';

export interface Store {
  members: Member[];
  games: Game[];
  loans: Loan[];
  reservations: Reservation[];
}

export function findMember(store: Store, memberId: string): Member | undefined {
  return store.members.find((member) => member.id === memberId);
}

export function findGame(store: Store, gameId: string): Game | undefined {
  return store.games.find((game) => game.id === gameId);
}

export function findLoan(store: Store, loanId: string): Loan | undefined {
  return store.loans.find((loan) => loan.id === loanId);
}

export function saveLoan(store: Store, loan: Loan): void {
  const existing = store.loans.findIndex((entry) => entry.id === loan.id);
  if (existing === -1) {
    store.loans.push(loan);
    return;
  }
  store.loans[existing] = loan;
}

/**
 * The in-memory library: four members, five games on the shelf, and the loan history
 * the desk has been keeping since the season started.
 */
export function createStore(): Store {
  return {
    members: [
      { id: 'M-1', name: 'Camille Durand', email: 'camille.durand@example.com', type: 'student' },
      { id: 'M-2', name: 'Youssef Amrani', email: 'youssef.amrani@example.com', type: 'staff' },
      { id: 'M-3', name: 'Sofia Marchetti', email: 'sofia.marchetti@example.com', type: 'external' },
      { id: 'M-4', name: 'noah petit', email: 'noah.petit@example.com', type: 'external' },
    ],
    games: [
      { id: 'G-1', title: 'Catan', category: 'standard', replacementValue: 2500, piecesComplete: true },
      { id: 'G-2', title: 'Dixit', category: 'standard', replacementValue: 1800, piecesComplete: true },
      { id: 'G-3', title: 'Wingspan', category: 'premium', replacementValue: 4500, piecesComplete: true },
      { id: 'G-4', title: 'Gloomhaven', category: 'premium', replacementValue: 6000, piecesComplete: true },
      { id: 'G-5', title: 'Azul', category: 'premium', replacementValue: 2000, piecesComplete: true },
    ],
    loans: [
      {
        id: 'L-1',
        gameId: 'G-2',
        memberId: 'M-1',
        rentedAt: new Date('2026-06-14T10:00:00Z'),
        dueAt: new Date('2026-06-21T10:00:00Z'),
        returnedAt: new Date('2026-06-21T17:35:00Z'),
        missingPieces: false,
      },
      {
        id: 'L-2',
        gameId: 'G-3',
        memberId: 'M-3',
        rentedAt: new Date('2026-06-25T14:00:00Z'),
        dueAt: new Date('2026-07-02T14:00:00Z'),
        returnedAt: new Date('2026-07-05T09:10:00Z'),
        missingPieces: true,
      },
    ],
    reservations: [
      {
        id: 'R-1',
        gameId: 'G-4',
        start: new Date('2026-05-02T09:00:00Z'),
        end: new Date('2026-05-04T18:00:00Z'),
        label: 'birthday party',
      },
    ],
  };
}
