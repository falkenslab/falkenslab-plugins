---
name: verify
description: Run the full quality gate of a Falken's Lab repository (origin under github.com/falkenslab) - typecheck, lint, tests, build, the project's own checks and its documentation site - stopping at the first failure, and report the result. Use before committing, before a release, and after any change to the code, its tests, scripts or docs.
---

# Verify

## 0. Find the gate

If the repository has its own `.claude/skills/verify/SKILL.md`, follow that one instead. Otherwise the gate is whatever CI runs: read `.github/workflows/*.yml`, `package.json`'s `scripts`, `CLAUDE.md` and `.minispec/core/stack.md`. For a Node project it is usually, in this order:

```
npm run typecheck
npm run lint
npm test
npm run build
npm run check          # when it exists (MCP servers: every tool complete)
```

plus each example project the repo ships (`examples/*`: `npm install && npm run typecheck`, and its tests), and the documentation site when `docs/` or anything it is generated from changed (`npm run docs:build`, or `npm run build` in `docs/`; `npm run docs:install` or `npm install` there first if `docs/node_modules` is missing).

## 1. Run it

From the repo root, in order, stopping at the first failure and reporting it. On Windows use Git Bash, and prefix Docker commands with `MSYS_NO_PATHCONV=1`. When the project says tests run in Docker (they launch browsers, or touch a sandbox), never run them on the host.

## 2. Rules

- Tests must report `fail 0`; quote the pass and fail counts.
- `dist/` is gitignored and `tsc` never deletes stale output: if files under `src/` were moved or removed, `rm -rf dist` before building, or orphaned files hide broken imports.
- The docs build fails on broken links and anchors; with a generated API reference, `grep -rE "\| - \|$" docs/content/api` must print nothing (every export documented).
- Nothing is left running afterwards: no server, browser or container the checks started.
- Never "fix" a failure by weakening a rule, skipping a test or adding `any`. Find the cause; if the fix is out of scope (a sibling repository, an upstream bug), report it instead.

Report only: what ran, pass or fail per step, the counts, and the exact error for any failure.
