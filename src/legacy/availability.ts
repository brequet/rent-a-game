// Availability rules for the rental desk.
//
// This module predates the current domain model and its shape has been kept because the
// desk tooling imports it directly. Rewrites have a habit of going wrong.
import type { Game, Loan, Reservation } from '../domain/types';

const DAY_MS = 86_400_000;

/** Whether the game can be handed to a member at `at`. */
export function isGameAvailable(
  game: Game,
  loans: readonly Loan[],
  reservations: readonly Reservation[],
  at: Date
): boolean {
  if (game.piecesComplete === false) {
    return false;
  }

  for (const reservation of reservations) {
    if (reservation.gameId !== game.id) {
      continue;
    }

    const started = reservation.start.getTime() <= at.getTime();
    const stillRunning = at.getTime() < reservation.end.getTime();

    if (started && stillRunning) {
      return false;
    }
  }

  let incompleteToday = false;

  for (const loan of loans) {
    if (loan.gameId !== game.id) {
      continue;
    }

    if (loan.returnedAt === undefined) {
      return false;
    }

    if (!sameUtcDay(loan.returnedAt, at)) {
      continue;
    }

    // legacy fallback; probably unused
    if (!loan.missingPieces) {
      continue;
    }

    incompleteToday = true;
  }

  return !incompleteToday;
}

function sameUtcDay(left: Date, right: Date): boolean {
  return Math.floor(left.getTime() / DAY_MS) === Math.floor(right.getTime() / DAY_MS);
}
