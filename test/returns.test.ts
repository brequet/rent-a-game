import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findGame, findLoan, findMember, saveLoan, type Store } from '../src/store';
import { computeLateFee } from '../src/domain/late-fees';
import { returnGame } from '../src/domain/returns';
import { DomainError, type Game, type Loan, type Member } from '../src/domain/types';

vi.mock('../src/store', () => ({
  findLoan: vi.fn(),
  findGame: vi.fn(),
  findMember: vi.fn(),
  saveLoan: vi.fn(),
}));

const member: Member = {
  id: 'M-1',
  name: 'Camille Durand',
  email: 'camille.durand@example.com',
  type: 'student',
};

const game: Game = {
  id: 'G-1',
  title: 'Catan',
  category: 'standard',
  replacementValue: 2500,
  piecesComplete: true,
};

const dueAt = new Date('2026-08-08T00:00:00Z');
const returnedAt = new Date('2026-08-12T00:00:00Z');

function openLoan(): Loan {
  return {
    id: 'L-1',
    gameId: game.id,
    memberId: member.id,
    rentedAt: new Date('2026-08-01T00:00:00Z'),
    dueAt,
  };
}

function storeStub(): Store {
  return { members: [member], games: [game], loans: [openLoan()], reservations: [] };
}

describe('returnGame', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(findLoan).mockReturnValue(openLoan());
    vi.mocked(findGame).mockReturnValue(game);
    vi.mocked(findMember).mockReturnValue(member);
  });

  it('does not accept an unknown loan', () => {
    vi.mocked(findLoan).mockReturnValue(undefined);

    let caught: unknown;
    try {
      returnGame(storeStub(), 'L-404', returnedAt);
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(DomainError);
    expect((caught as DomainError).code).toBe('NOT_FOUND');
  });

  it('saves the loan when the game comes back', () => {
    returnGame(storeStub(), 'L-1', returnedAt);

    expect(saveLoan).toHaveBeenCalled();
  });

  it('returns the fee the pricing module computes', () => {
    const fee = returnGame(storeStub(), 'L-1', returnedAt);
    const expected = computeLateFee({ ...openLoan(), returnedAt }, game, member, returnedAt);

    expect(fee).toBe(expected);
  });

  it('returns a number of cents', () => {
    const fee = returnGame(storeStub(), 'L-1', returnedAt);

    expect(typeof fee).toBe('number');
  });
});
