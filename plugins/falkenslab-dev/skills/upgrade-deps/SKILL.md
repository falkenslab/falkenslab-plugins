---
name: upgrade-deps
description: Upgrade a Falken's Lab repository's dependencies (origin under github.com/falkenslab) one package or family at a time - read the release notes, re-check what the project relies on, run the gate and commit each bump on its own. Use when the user asks to bump a dependency, update everything, or when investigating a behavior change after an update.
---

# Upgrading dependencies

If the repository has its own `.claude/skills/upgrade-deps/SKILL.md` (or `upgrade-<package>`), follow that one instead: it lists what each package is relied on for.

An upgrade is more than `npm update`: a bundled project (one `dist/` file built with esbuild) ships its dependencies to everyone who runs it, and a library's consumers inherit its ranges.

## 1. See what's behind

```
npm outdated
```

Read `.minispec/core/stack.md` and the ADRs for pinned versions and why (a TypeScript line `typescript-eslint` supports, a Node minimum, an SDK contract). A pin with a reason stays unless the reason is gone.

## 2. One package or family per commit

```
npm install -D <package>@<version>      # or without -D for runtime dependencies
```

Read the release notes when reachable, looking for breaking changes in what the project uses. Families move together: `typescript-eslint` with `eslint`, every `@docusaurus/*` to the same version, `@falkenslab/*` siblings to their latest published release.

What to re-check, by kind:

- **An SDK or framework the code is built on** (MCP SDK, Claude Agent SDK, Playwright): the APIs and behaviors the code relies on, its tests, and anything generated from it.
- **Schemas** (zod): the JSON Schema produced from them, when tools or configs expose it.
- **Build tools** (esbuild, TypeScript): the output still runs (`node dist/<entry> --version`), and a packed tarball installs with `npx`.
- **Docusaurus**: the site builds in both languages, search and versioned docs included.
- **Node**: raising the minimum is `engines`, the CI matrix, `@types/node` and `stack.md` together.

## 3. Run the gate

Run the `verify` skill, the docs site included. Type errors are usually the first sign of a changed contract.

## 4. Record it

Commit with the `commit` skill: `build(deps): bump <package> to <version>` for a plain bump, `fix` or `refactor` for code that had to adapt, saying what was re-checked. A fix every project built from a Falken's Lab template needs belongs in the template too (`mcp-server-template`, `experiment-template`): say so in the report.
