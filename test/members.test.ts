import { describe, expect, it } from 'vitest';
import { addMember, isMemberType } from '../src/domain/members';
import { createStore, findMember } from '../src/store';

describe('addMember', () => {
  it('appends the new member to the store', () => {
    const store = createStore();
    const member = addMember(store, {
      name: 'Ada Lovelace',
      email: 'ada.lovelace@example.com',
      type: 'external',
    });

    expect(store.members).toContain(member);
    expect(findMember(store, member.id)).toBe(member);
  });

  it('assigns distinct ids', () => {
    const store = createStore();
    const first = addMember(store, {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      type: 'external',
    });
    const second = addMember(store, {
      name: 'Alan Turing',
      email: 'alan@example.com',
      type: 'staff',
    });

    expect(second.id).not.toBe(first.id);
  });
});

describe('isMemberType', () => {
  it('accepts the three member types', () => {
    expect(isMemberType('student')).toBe(true);
    expect(isMemberType('staff')).toBe(true);
    expect(isMemberType('external')).toBe(true);
  });

  it('rejects other strings', () => {
    expect(isMemberType('teacher')).toBe(false);
  });
});
