import type { Store } from '../store';
import type { Game, GameCategory } from './types';

export const GAME_CATEGORIES: readonly GameCategory[] = ['standard', 'premium'];

export function isPremium(game: Game): boolean {
  return game.category === 'premium';
}

function nextGameId(store: Store): string {
  return `G-${store.games.length + 1}`;
}

/** Adds a game to the shelf. New games are complete unless the desk says otherwise. */
export function addGame(
  store: Store,
  details: {
    title: string;
    category: GameCategory;
    replacementValue: number;
    piecesComplete?: boolean;
  }
): Game {
  const game: Game = {
    id: nextGameId(store),
    title: details.title,
    category: details.category,
    replacementValue: details.replacementValue,
    piecesComplete: details.piecesComplete ?? true,
  };

  store.games.push(game);
  return game;
}
