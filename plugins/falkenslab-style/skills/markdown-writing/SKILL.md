---
name: markdown-writing
description: The user's rules for writing Markdown - one line per paragraph and list item (no hard wraps at 80-100 columns), no horizontal-rule separators between sections, no tables with an empty header row (use a list with bold names instead), one command or item per table row with its own description, and the other conventions listed here. Use every time you write or edit any Markdown file (README, docs, cheatsheets, guides, CHANGELOG, SKILL.md, CLAUDE.md, reports, notes) in any project, and to fix an existing file that breaks them.
---

# Writing Markdown

These are the user's conventions for any Markdown you write, in any project. They win over the style of the file you're editing; if a project's own instructions (its CLAUDE.md, a style guide) say otherwise, follow the project and mention the conflict.

## Rules

### 1. No hard wraps

A single newline doesn't break a paragraph when rendered, but in the editor, in diffs and when copying text it looks broken, and every later edit reflows several lines.

- **A paragraph is one line**, however long. The editor wraps it on screen.
- **A list item is one line**, including its explanation. Its continuation paragraphs (after a blank line, indented) are one line each too.
- **A blockquote paragraph is one line** after the `> `. Several quoted paragraphs are separated by a `>` line on its own.
- **A table cell stays on its row.**
- Newlines are only for structure: between blocks (blank line), between list items, between table rows, and inside fenced code, which is kept exactly as it is.
- A deliberate line break inside a paragraph (a postal address, verses) is a trailing `\`, never a bare newline.
- The frontmatter `description` of a skill is one line too.

Wrong:

```markdown
El asistente toma apuntes del curso mientras trabaja y, en la siguiente
conversación, parte de ahí.
```

Right:

```markdown
El asistente toma apuntes del curso mientras trabaja y, en la siguiente conversación, parte de ahí.
```

### 2. No separators between sections

Don't put horizontal rules (`---`, `***`, `___`) between sections: the headings already separate them, and the rules only add noise to the source and to the rendered page.

- A new section is just its heading after a blank line.
- If a page seems to need rules to be readable, it needs better headings (a clear hierarchy of `##` and `###`), not rules.
- This doesn't touch the `---` that open and close a YAML frontmatter, nor the header row of a table (`| --- |`).

### 3. No tables with an empty header

Don't write a table whose header row is empty (`| | |`) just to lay out term/explanation pairs. A table is for data with real columns, and every column has a heading that says what it holds.

- For a list of items, each with a name and an explanation (features, advantages, tips), use a list whose items start with the name in bold: `- **Name.** Explanation.` (an emoji before the bold name is fine if the page uses them).
- If the content really is tabular, give each column a meaningful heading (`| Qué quieres | Qué haces |`).

Wrong:

```markdown
| | |
| --- | --- |
| **Tiene memoria** | Toma apuntes del curso mientras trabaja. |
```

Right:

```markdown
- **Tiene memoria.** Toma apuntes del curso mientras trabaja.
```

### 4. One item per row

In a table or list of commands, options, shortcuts or similar, each item gets its own row with its own description. Don't group several in one cell (`` `/a` · `/b` · `/c` ``) with a shared description.

Wrong:

```markdown
| `/knowledge:ingest` · `/knowledge:query` | Incorporar documentos, consultar su memoria |
```

Right:

```markdown
| `/knowledge:ingest` | Incorporar a su memoria los documentos nuevos de `sources/` |
| `/knowledge:query <pregunta>` | Responder a partir de su memoria del curso |
```

## Fixing an existing file

`scripts/fix-markdown.mjs` (next to this file) applies the mechanical rules (1 and 2) in place: it joins hard-wrapped paragraphs, list items and blockquotes, and removes section separators. Rules 3 and 4 need judgement, so fix those by hand. It leaves frontmatter, fenced code, tables, headings and HTML untouched, keeps a line that starts with a template placeholder (`{{name}}`, which may expand to whole sections in a prompt template) on its own, and keeps the file's line endings. For Markdown that code reads (prompt templates, files parsed by scripts), check that no line-based placeholder or marker other than `{{…}}` got joined, and run the project's checks afterwards.

```bash
node "${CLAUDE_SKILL_DIR}/scripts/fix-markdown.mjs" path/to/file.md
```

Then read the diff looking for two blocks glued together (typically a line that should have started a new block without a blank line before it, or two speakers of a quoted dialogue) and separate them by hand.

Only fix files you are writing or were asked to fix. If other Markdown files in the project break these rules, mention it and ask before touching them, since reflowing a whole file makes a large diff.

## Adding rules

When the user gives a new general Markdown convention, add it here as a new numbered section under "Rules" (what to do, why, a short wrong/right example if it helps), update the `description` so it names it, and extend `fix-markdown.mjs` if the rule is mechanical.
