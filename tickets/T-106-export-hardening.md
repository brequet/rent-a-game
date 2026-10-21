# T-106 — Harden the member export

**Status:** open
**Area:** member export
**Priority:** high

## Requirement

Harden the CSV export on `origin/feature/member-export` without changing the stored member records.

- Keep the fixed header `id;name;email;type`, including for an empty member list.
- Do not mutate or title-case stored member names. For ordinary values, preserve the text exactly in the CSV; when formula neutralization is needed, apply it only to the serialized field, not to the member record.
- Quote CSV fields correctly when they contain the delimiter, a quote, or a line break.
- Neutralize spreadsheet formula execution when a field's first non-whitespace character is `=`, `+`, `-`, or `@`. CSV quoting alone is not sufficient.
- Do not log member email addresses. If an export summary is logged, it may contain only the number of members.
- Preserve the existing `toCsv` and `exportMembers` public signatures.

## Acceptance criteria

- [ ] Empty input returns the header and a trailing newline without throwing.
- [ ] Fields containing semicolons, quotes, and line breaks round-trip as CSV fields.
- [ ] Formula-leading values are neutralized in the exported output.
- [ ] Ordinary names are exported exactly as stored, and exporting never mutates member records.
- [ ] Export logs contain no member names or email addresses.
- [ ] Tests cover each criterion; `npm test` and `npm run typecheck` pass.

## Notes

- Work on a new branch based on `origin/feature/member-export`; do not amend that branch.
- No new dependencies.
