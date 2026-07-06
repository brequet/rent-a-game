export type MemberType = 'student' | 'staff' | 'external';

export interface Member {
  id: string;
  name: string;
  email: string;
  type: MemberType;
}

export type GameCategory = 'standard' | 'premium';

export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  /** Replacement cost of the game, in cents. */
  replacementValue: number;
  piecesComplete: boolean;
}

export interface Loan {
  id: string;
  gameId: string;
  memberId: string;
  rentedAt: Date;
  /** rentedAt + 7 days. */
  dueAt: Date;
  returnedAt?: Date;
  missingPieces?: boolean;
}

export interface Reservation {
  id: string;
  gameId: string;
  start: Date;
  end: Date;
  label?: string;
}

export type DomainErrorCode =
  | 'NOT_FOUND'
  | 'ALREADY_RETURNED'
  | 'GAME_UNAVAILABLE'
  | 'LOAN_LIMIT_REACHED';

export class DomainError extends Error {
  readonly code: DomainErrorCode;

  constructor(code: DomainErrorCode, message: string) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}
