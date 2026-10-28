# rent-a-game

A practice repository for learning to drive a coding agent: a small board-game rental library with a test suite you can run, inspect and change.

## Requirements

- Node.js 22 or newer, with npm (bundled with Node)
- or `nix develop`, which provides a suitable Node in a shell

## Setup

```bash
npm install
npm test           # run the test suite once
npm run test:watch # re-run tests while you change code
npm run typecheck  # TypeScript strict type check
```

## About the app

`rent-a-game` is the in-memory core of a board-game rental library. Members borrow games for 7 days, games can be reserved for a date range, and late returns are charged a fee. Everything lives in memory — no database, no server — and the tests drive the domain code directly.

## Pricing

Late fees are 0.50 EUR per day, capped at 5 EUR per loan.

## Exercises

| # | Name | Concept |
|---|------|---------|
| 1 | Where's the truth? | context, tools, evidence |
| 2 | Plan, trim, build | steering, scope |
| 3 | Green tests lie | verification |
| 4 | Catch the slop | review |
| 5 | Touch the scary file | leverage with a safety net |
| 6 | The file bites back (optional) | untrusted content, least privilege |
| 7 | Import with guardrails | runtime validation, atomicity |
| 8 | Reservations that don't collide | domain modeling, time intervals |
| 9 | Find the first bad commit | Git history, causal debugging |
| 10 | Close the review | secure implementation, review follow-through |

All exercises start from the delivered `main` snapshot. The only extra ref is `origin/feature/member-export`, used by Exercises 4 and 10.

## How to work

1. Open the brief for the exercise you are on: `exercises/NN-slug/brief.md`. It holds the task, the constraints and a self-check.
2. Start your agent from the repository root. It picks up `AGENTS.md` with the ground rules.
3. Run `npm test` and `npm run typecheck` as you go.
4. Every exercise starts from the delivered `main` snapshot. To reset between exercises, run `git restore .` and `git clean -fd` (preview with `git clean -nd` first). Uncommitted work is discarded by that reset.
