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

| # | Name | Concept | Time |
|---|------|---------|------|
| 1 | Where's the truth? | context, tools, evidence | 15-20 min |
| 2 | Plan, trim, build | steering, scope | 25-30 min |
| 3 | Green tests lie | verification | 30-35 min |
| 4 | Catch the slop | review | 20-25 min |
| 5 | Touch the scary file | leverage with a safety net | 30-40 min |
| 6 | The file bites back (optional) | untrusted content, least privilege | 15-20 min |
| 7 | Import with guardrails | runtime validation, atomicity | 30-40 min |
| 8 | Reservations that don't collide | domain modeling, time intervals | 30-40 min |
| 9 | Find the first bad commit | Git history, causal debugging | 25-35 min |
| 10 | Close the review | secure implementation, review follow-through | 30-40 min |

Exercises 7-10 start from `ex-07-start` through `ex-10-start`, respectively.

## How to work

1. Open the brief for the exercise you are on: `exercises/NN-slug/brief.md`. It holds the task, the constraints and a self-check.
2. Start your agent from the repository root. It picks up `AGENTS.md` with the ground rules.
3. Run `npm test` and `npm run typecheck` as you go.
4. Every exercise starts from a tag: `git checkout ex-0N-start` takes you back to its starting point. Uncommitted work is discarded by that reset.
