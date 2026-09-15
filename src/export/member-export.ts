import type { Store } from '../store';
import type { Member } from '../domain/types';

const HEADER = 'id;name;email;type';

function toRow(member: Member): string {
  return [member.id, member.name, member.email, member.type].join(';');
}

/**
 * The member list as a semicolon-separated file, ready for the office suite the front
 * desk uses.
 */
export function toCsv(members: readonly Member[]): string {
  const lines = [HEADER, ...members.map(toRow)];
  return `${lines.join('\n')}\n`;
}

export function exportMembers(store: Store): string {
  return toCsv(store.members);
}
