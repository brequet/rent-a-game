import { describe, expect, it } from 'vitest';
import { createStore } from '../src/store';
import { addGame, isPremium } from '../src/domain/games';

describe('isPremium', () => {
  it('recognises premium games', () => {
    const store = createStore();
    const premium = store.games.find((game) => game.category === 'premium');
    const standard = store.games.find((game) => game.category === 'standard');

    expect(premium && isPremium(premium)).toBe(true);
    expect(standard && isPremium(standard)).toBe(false);
  });
});

describe('addGame', () => {
  it('adds the game as complete by default', () => {
    const store = createStore();
    const game = addGame(store, { title: 'Carcassonne', category: 'standard', replacementValue: 2200 });

    expect(store.games).toContain(game);
    expect(game.piecesComplete).toBe(true);
  });

  it('keeps the details it was given', () => {
    const store = createStore();
    const game = addGame(store, {
      title: 'Brass: Birmingham',
      category: 'premium',
      replacementValue: 5500,
      piecesComplete: false,
    });

    expect(game.category).toBe('premium');
    expect(game.replacementValue).toBe(5500);
    expect(game.piecesComplete).toBe(false);
  });
});
