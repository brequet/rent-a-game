import { describe, expect, it } from 'vitest';
import { isGameAvailable } from '../src/legacy/availability';
import type { Game } from '../src/domain/types';

const at = new Date('2026-08-03T12:00:00Z');

const game: Game = {
  id: 'G-1',
  title: 'Catan',
  category: 'standard',
  replacementValue: 2500,
  piecesComplete: true,
};

describe('isGameAvailable', () => {
  it('is available when nothing stands in the way', () => {
    expect(isGameAvailable(game, [], [], at)).toBe(true);
  });

  it('is unavailable when the box is not complete', () => {
    expect(isGameAvailable({ ...game, piecesComplete: false }, [], [], at)).toBe(false);
  });
});
