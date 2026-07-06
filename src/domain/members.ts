import type { Store } from '../store';
import type { Member, MemberType } from './types';

export const MEMBER_TYPES: readonly MemberType[] = ['student', 'staff', 'external'];

export function isMemberType(value: string): value is MemberType {
  return MEMBER_TYPES.some((type) => type === value);
}

function nextMemberId(store: Store): string {
  return `M-${store.members.length + 1}`;
}

/** Registers a new member at the desk. Ids are assigned from the size of the list. */
export function addMember(
  store: Store,
  details: { name: string; email: string; type: MemberType }
): Member {
  const member: Member = {
    id: nextMemberId(store),
    name: details.name,
    email: details.email,
    type: details.type,
  };

  store.members.push(member);
  return member;
}
