import { describe, expect, it } from 'vitest';
import { createStore, findMember } from '../src/store';
import { addMember, isMemberType } from '../src/domain/members';

describe('isMemberType', () => {
  it('accepts the three member types', () => {
    expect(isMemberType('student')).toBe(true);
    expect(isMemberType('staff')).toBe(true);
    expect(isMemberType('external')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isMemberType('teacher')).toBe(false);
  });
});

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

  it('gives every member a distinct id', () => {
    const store = createStore();
    const first = addMember(store, { name: 'Ada Lovelace', email: 'ada@example.com', type: 'external' });
    const second = addMember(store, { name: 'Alan Turing', email: 'alan@example.com', type: 'staff' });

    expect(second.id).not.toBe(first.id);
  });
});
