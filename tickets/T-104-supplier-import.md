# T-104 — Validate supplier game data

**Status:** open
**Area:** supplier import
**Priority:** normal

## Requirement

Add a pure function in `src/import/supplier-import.ts`:

```ts
validateSupplierImport(input: unknown): SupplierImportResult
```

The function validates supplier data without reading or writing files and without mutating a store.

- The root must be an object with a `rows` array.
- Each row must be an object with a non-blank string `sku`, non-blank string `title`, `category` equal to `standard` or `premium`, positive safe-integer `replacementValue` in cents, and boolean `piecesComplete`. Check blankness with trimming, but preserve valid strings exactly as supplied; compare SKUs exactly without normalization.
- SKUs must be unique within the file. Report a duplicate against the later row.
- Ignore metadata and `notes`; these fields are not part of a game draft. A returned draft contains exactly `sku`, `title`, `category`, `replacementValue`, and `piecesComplete`.
- Return a stable issue code for every invalid value, at root level or row level. Row-level issues identify the row (1-based within `rows`) and, where applicable, the field name. Root-level issues have no row. Use `ROOT_NOT_OBJECT`, `ROWS_NOT_ARRAY`, `ROW_NOT_OBJECT`, `SKU_REQUIRED`, `DUPLICATE_SKU`, `TITLE_REQUIRED`, `INVALID_CATEGORY`, `INVALID_REPLACEMENT_VALUE`, and `INVALID_PIECES_COMPLETE` as applicable. Do not throw for malformed supplier input or coerce values.
- The result is all-or-nothing: on any issue, return `valid: false`, an empty `games` array, and the issues. With no issues, return `valid: true`, all validated game drafts, and an empty issue list.

## Acceptance criteria

- [ ] Valid documents return all validated game drafts.
- [ ] The supplied sample reports the duplicate SKU, invalid category, and null replacement value.
- [ ] A document with any issue returns no game drafts.
- [ ] Malformed roots, non-object rows, and wrong field types are reported rather than thrown or coerced.
- [ ] The function does not mutate its input or the store.
- [ ] `npm test` and `npm run typecheck` pass.

## Notes

- Do not edit `data/supplier-import.json`.
- No new dependencies.
