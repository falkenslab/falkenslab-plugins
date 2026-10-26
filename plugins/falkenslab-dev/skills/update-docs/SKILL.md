---
name: update-docs
description: Keep a Falken's Lab repository's documentation (origin under github.com/falkenslab) in step with the code - the Docusaurus site in docs/ in English and its Spanish translation, the README, doc comments, CLI usage text, .minispec/ and CLAUDE.md. Use after any change users would notice, before committing it, and before a release. A change is not done until its documentation is.
---

# Keep the documentation up to date

If the repository has its own `.claude/skills/update-docs/SKILL.md`, follow that one instead: it maps changes to pages. Otherwise use this one.

Documentation in Falken's Lab projects is for three readers: people installing and using the project (the site in `docs/`, English in `docs/content/` and Spanish in `docs/i18n/es/docusaurus-plugin-content-docs/current/`; the README is a front door with a quick start), people developing it (the site's developer pages), and future sessions working on it (`.minispec/`, `CLAUDE.md`). Code that changes what someone sees, can configure or must do, and isn't documented, is unfinished work.

## 1. Find what changed

```
git status --short
git diff --stat
git diff -- <public entry points: src/index.ts, src/cli.ts, src/tools/index.ts, src/config.ts, package.json>
```

Counts as visible: an export, option, parameter, tool, command, flag or setting added, removed or renamed; a changed default, behavior, output, file location or error message; a requirement or install step; the build; a fix that changes what someone could rely on. Internal refactors and tests need no page change.

## 2. Find the pages

`docs/sidebars.ts` is the site's map. `grep -rn "<the option, tool or function>" README.md CLAUDE.md .minispec docs/content docs/i18n src` finds every place that names it, so none keeps describing the old behavior. Typical owners:

- A new module or piece: `.minispec/core/architecture.md`.
- Build, stack, commands: `.minispec/core/stack.md` and `CLAUDE.md`'s commands.
- A rule for all future work: `.minispec/core/conventions.md` or `principles.md`.
- A decision that's hard to reverse: a new ADR with the `minispec-adr` skill.
- Work done from a card: the card deleted (`minispec-implement`), its permanent lessons promoted first.
- Generated references (tools, API): regenerate them (`npm run tools` in `docs/`, `npm run docs:build`) instead of editing by hand.

## 3. Write it

- English, technical and concrete; Markdown per the `markdown-writing` skill (one line per paragraph and list item, no horizontal rules). README and site per `falkenslab-docs` and `falkenslab-site-style` when available.
- Change the existing explanation rather than appending a note that contradicts it.
- Pages are CommonMark (`.md`), not MDX, unless the project says otherwise: write `<placeholders>` inside backticks. A new page goes in `docs/sidebars.ts`.
- Never edit `docs/versioned_docs/`: those are released versions.
- MiniSpec limits: 100 lines per document, `project.md` ≤ 50, `principles.md` ≤ 20.
- Every exported function or type has a doc comment saying what it is for.
- No credentials or personal data, ever, examples included.

## 4. Spanish, in the same change

Every English page changed, added or removed changes its Spanish page at the same path under `docs/i18n/es/docusaurus-plugin-content-docs/current/`. Translate the change, not the page. Spain's Spanish, `tú`, every accent and ñ; code and product names unchanged. Translated headings keep the English anchor (`## Instalación {#installation}`); links keep their targets. New sidebar labels go in `current.json` (`npx docusaurus write-translations --locale es`), home page texts through `translate()` into `code.json`. Follow the terms the existing Spanish pages use.

## 5. Build and commit

Build the site (`npm run docs:build` or `npm run build` in `docs/`): it fails on broken links and anchors; fix the cause, never turn the check off. A screenshot a change makes wrong is regenerated from a real session, never edited. The documentation goes in the same commit as the change (or right next to it, `docs: …`). Report which pages you changed, or why none needed to.
