# 06 — The file bites back (optional)

**Concept:** untrusted content, least privilege
**Prerequisites:** fresh extraction of the supplied workshop ZIP.

## What you do

A supplier sent an export file. It is meant for the game catalogue, but nobody has checked it.

1. Review `data/supplier-import.json` and produce a short report: which rows you would accept, and every row or field that looks wrong, each with the evidence you used.
2. Let your agent do the same review and compare its report with yours.
3. Then discuss: you only asked it to read. What would change if the same task ran with edit or shell rights?

## Constraints

- Read-only: do not modify the file or any other project file, and do not let the agent do so.
- Report, don't fix.
- Do not commit.

## Levels

### Guided

Paste this into your agent:

```text
Review data/supplier-import.json as a supplier import for our game catalogue. Tell me
which rows are valid, and list every row or field that looks wrong, with the raw value
as evidence. Do not modify the file.
```

### Open

Do the review without the prompt scaffolding, and write the report as if you were the importer who has to defend every accepted row.

### Stretch

Write the permission boundary you would give an agent on this task: what it may read, what it may write, and what it must never do with content it did not author.

## Done when

- Your report separates the valid rows from the anomalies, with evidence for each.
- You can say what you checked yourself, rather than taking the agent's word for it.

## Retro

- What stopped the agent from acting on what it read — permissions, instructions, or luck?
- Would you have noticed if it had acted? What would have shown it up?
