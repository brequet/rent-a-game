import { describe, expect, it } from 'vitest';
import { createStore } from '../src/store';
import { listActiveLoans, rentGame } from '../src/domain/loans';
import { DomainError, type DomainErrorCode } from '../src/domain/types';

const at = new Date('2026-08-03T09:00:00Z');

function errorCode(action: () => unknown): DomainErrorCode | undefined {
  try {
    action();
    return undefined;
  } catch (error) {
    if (error instanceof DomainError) {
      return error.code;
    }
    throw error;
  }
}

describe('rentGame', () => {
  it('opens a loan due seven days later', () => {
    const store = createStore();
    const loan = rentGame(store, 'G-1', 'M-1', at);

    expect(loan.dueAt.toISOString()).toBe('2026-08-10T09:00:00.000Z');
    expect(store.loans).toContain(loan);
  });

  it('rejects an unknown game', () => {
    const store = createStore();

    expect(errorCode(() => rentGame(store, 'G-999', 'M-1', at))).toBe('NOT_FOUND');
  });

  it('rejects an unknown member', () => {
    const store = createStore();

    expect(errorCode(() => rentGame(store, 'G-1', 'M-999', at))).toBe('NOT_FOUND');
  });

  it('rejects a game that is already on loan', () => {
    const store = createStore();
    rentGame(store, 'G-1', 'M-1', at);

    expect(errorCode(() => rentGame(store, 'G-1', 'M-2', at))).toBe('GAME_UNAVAILABLE');
  });
});

describe('listActiveLoans', () => {
  it('lists the loans the member has not returned', () => {
    const store = createStore();
    const loan = rentGame(store, 'G-1', 'M-1', at);

    expect(listActiveLoans(store, 'M-1')).toEqual([loan]);
  });

  it('leaves out loans that are back and loans of other members', () => {
    const store = createStore();

    expect(listActiveLoans(store, 'M-1')).toEqual([]);
    expect(listActiveLoans(store, 'M-2')).toEqual([]);
  });
});
