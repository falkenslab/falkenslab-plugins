---
name: falkenslab-docs
description: The user's rules for the documentation of Falken's Lab projects (repositories under github.com/falkenslab) - a rich README modeled on moodle-mcp's (centered hero with logo, promise and badges, links to the docs in English and Spanish, short intro, emoji headings, why it's different, quick start, examples, a real screenshot, what's inside, the docs' main pages, developing; no license section) and the signature "Made with 💖 by Falken's Lab Team" as the only footer of every README and every documentation site (no license or copyright line). Use whenever you write or edit a README.md, a documentation site (Docusaurus docs/, its footer, its translations) or other user-facing docs in a falkenslab repository; check with `git remote get-url origin`. Not for other organizations' projects.
---

# Falken's Lab documentation

Rules for the documentation of the user's Falken's Lab projects: the repositories whose `origin` is under `github.com/falkenslab/` (`git remote get-url origin`). Elsewhere they don't apply. The Markdown itself follows the `markdown-writing` skill (one line per paragraph and list item, no `---` separators, no tables with an empty header row…), and the project's own instructions (its CLAUDE.md, ADRs) win where they say something more specific. How a page or a documentation site looks (colors, type, the top bar, the hero) is the `falkenslab-site-style` skill's.

## 1. The signature

Every README and every documentation site ends with this line, exactly, emoji included:

> Made with 💖 by Falken's Lab Team

- **README.md**: the last thing in the file, after the developing section, centered:

  ```markdown
  <div align="center">

  Made with 💖 by Falken's Lab Team

  </div>
  ```

- **A Docusaurus site**: the footer's `copyright` is the signature alone: `copyright: "Made with 💖 by Falken's Lab Team"`. The signature is a brand line: it is never translated. If a locale overrides the copyright (`docs/i18n/<locale>/docusaurus-theme-classic/footer.json`, key `copyright`), leave that key out so the footer stays the configured one.

The signature is the only footer line. Never a license or copyright line ("MIT licensed. Copyright © 2026 <owner>."), in a site's footer, a README or any other doc: the badge and the `LICENSE` file already say it (the owner's choice, 14 October 2026).
- **Other user-facing docs** with a footer of their own (a landing page, a generated HTML report, a PDF): the same line at the foot.

Never more than once per page, and never in code, commit messages, issues or package metadata.

## 2. The README

A README is the project's landing page on GitHub and npm: it tells in a minute what the project is, for whom, and how to start, and sends the reader to the documentation site for everything else. The model is moodle-mcp's README (`../moodle-mcp/README.md` next to the other repositories; read it when in doubt). In order:

1. **The hero**, centered (`<div align="center">` … `</div>`, with blank lines inside so the Markdown renders):
   - the logo from the docs site (`docs/static/img/logo.svg`, `width="112"`, a real `alt` describing it);
   - `# <name>`;
   - the promise: one bold line saying what it gives the reader, then `<br/>` and a second line with what sets it apart;
   - shields.io badges, one per line: npm version (linked to the package), the runtime (Node.js 20+…), the key technology or kind of project, the Moodle versions when it works with Moodle, the license (linked to `LICENSE`); colors and logos as moodle-mcp's;
   - the documentation links, bold for the main language, each with 📖: `**[📖 Documentation](https://falkenslab.github.io/<repo>/)** · [📖 Documentación en español](https://falkenslab.github.io/<repo>/es/)` (the second only when the site has a Spanish locale).
2. **The intro**: one paragraph, plain, for the person who will use it: what it is, what it does with examples, how it works in one sentence, and what makes it different.
3. **✨ Why <name>**: what sets it apart, as a list of five to eight items, each `- <emoji> **<a short bold claim>.** <one sentence>` (🔐 security, 🧩 nothing to install, 🕶️ privacy, 🎚️ control, 🌐 reach, 🤖 compatibility…).
4. **🚀 Quick start**: the shortest path to a first result, copy-paste commands or code, with the prerequisites in one line before them and what to expect after them. Secondary setups (another client, another platform) go in a collapsed `<details><summary>…</summary>` block, so the main path stays short.
5. **💬 What you can ask** (or **🧪 A taste of the code** for a library): a few real examples, grouped by who uses them with an emoji each (👩‍🏫 as a teacher, 🧑‍🎓 as a student), in the reader's words.
6. **📸 See it at work**: one real screenshot of the project in use (never a mock-up), centered, `width` about 760, with a one-line caption before it and a link to the docs' use cases after it. Its `src` is an absolute `raw.githubusercontent.com/<org>/<repo>/main/…` URL when the README ships in a package (npm shows the README, and relative images break there).
7. **🧰 What's inside**: a table with a header row (`| Area | For example |`), one area per row starting with an emoji, a few concrete examples per area, and a link to the full reference.
8. **📚 Documentation**: a short list of the site's main pages, each `- **[<page>](<url>)**: <what it's for>`. A page not released yet links to the site's `/next/` version, or the default (released) version 404s.
9. **🛠️ Developing**: one or two sentences pointing to the site's developer page and to `.minispec/` (design decisions), with the key commands only if the site doesn't list them.
10. **The signature** (section 1).

No license section: the license badge in the hero (linked to `LICENSE`) and the `LICENSE` file already say it (the owner's choice, 14 October 2026).

Style: English (the projects' ADRs keep repositories in English; the Spanish lives in the docs site's Spanish locale), concrete, for the reader rather than about the code. Every `##` heading starts with one emoji, and list items and table rows that open a topic do too: a friendly, scannable page, but one emoji per item, never strings of them, and none inside code. Rich but short: each section fits a screen, and anything longer belongs on the docs site. Check every link answers (`curl -s -o /dev/null -w '%{http_code}'`) before committing. Images from the repository by relative path (they render on GitHub; on npm they need absolute `raw.githubusercontent.com` URLs: use those when the README ships in a package and shows images). Every link works; no badge without a target that exists.

## 3. Applying it to an existing project

When asked to apply these rules (or when touching a README or site footer that breaks them): add the signature where missing, bring the README's hero and order in line with section 2 without dropping content the user wrote or asked for (move it, shorten it, or send it to the docs site, and say what moved), check the site builds (`npm run docs:build` or the project's equivalent) and that the README renders (no raw HTML showing, badges loading). Commit as the project's conventions say, as a docs change.
