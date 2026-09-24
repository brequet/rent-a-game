import type { Store } from '../store';
import type { Member } from '../domain/types';

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toRow(member: Member): Record<string, string> {
  return {
    id: member.id,
    name: toTitleCase(member.name),
    email: member.email,
    type: member.type,
  };
}

/**
 * The member list as a semicolon-separated file, ready for the office suite the front
 * desk uses. Names are written the way the desk wants to read them.
 */
export function toCsv(members: readonly Member[]): string {
  const header = Object.keys(toRow(members[0])).join(';');
  const lines = [header, ...members.map((member) => Object.values(toRow(member)).join(';'))];

  return `${lines.join('\n')}\n`;
}

export function exportMembers(store: Store): string {
  const emails = store.members.map((member) => member.email);
  console.log(`[member-export] ${emails.length} members: ${emails.join(', ')}`);

  return toCsv(store.members);
}
