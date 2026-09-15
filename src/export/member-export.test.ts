import { describe, expect, it } from 'vitest';
import { createStore } from '../store';
import { exportMembers, toCsv } from './member-export';

describe('member export', () => {
  it('starts with the fixed header', () => {
    const csv = exportMembers(createStore());

    expect(csv.split('\n')[0]).toBe('id;name;email;type');
  });

  it('writes one line per member', () => {
    const store = createStore();
    const lines = toCsv(store.members).trimEnd().split('\n');

    expect(lines).toHaveLength(store.members.length + 1);
  });
});
