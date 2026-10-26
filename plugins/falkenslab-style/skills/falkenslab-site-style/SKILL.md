---
name: falkenslab-site-style
description: The visual style of Falken's Lab's web pages and documentation sites (repositories under github.com/falkenslab), as falkenslab/agent-extensions' site defines it - Inter and JetBrains Mono, a coral accent (#e5483a light, #ff6b57 dark) with indigo marks, light, dark and system themes from CSS tokens, a sticky translucent top bar with EN/ES and theme switches, a centered hero with an uppercase eyebrow, a 900-weight title and a radial glow, cards with hairlines and soft shadows, pill chips, underlined tabs, commands in a terminal window and example requests to an AI agent in an AI app's message box (never bare code blocks or quotes), and the footer signature. With templates (site.css, page.html, site.js, a Docusaurus custom.css, Terminal and Prompt components for Docusaurus, the family's logo). Use whenever you build or restyle a project page, a landing page, a catalog or a Docusaurus documentation site in a falkenslab repository; check with `git remote get-url origin`. Content rules (README, signature, languages) are falkenslab-docs'.
---

# Falken's Lab's site style

How Falken's Lab's pages look, taken from [falkenslab/agent-extensions](https://falkenslab.github.io/agent-extensions/)' site (`../agent-extensions/site/`: `index.html`, `catalog.html`, `site.css`, `site.js`). Apply it to any falkenslab project's web page or documentation site, so they all look like one family. What a page says (the signature, English and Spanish, the README's shape) is the `falkenslab-docs` skill's; this one is how it looks.

The templates are in this skill's `templates/` folder (`${CLAUDE_SKILL_DIR}/templates/`):

| File | What it is | Use it for |
| --- | --- | --- |
| `site.css` | agent-extensions' whole stylesheet: tokens, top bar, hero, install card, cards, chips, tabs, dialogs, steps, footer | A static page or a small site: copy it whole, drop what the page doesn't use |
| `page.html` | A project home page: top bar, hero with eyebrow, title, intro and two buttons, an install card with a tab per client, three cards of reasons, the footer | The starting point of a static page; replace `PROJECT` and the texts |
| `site.js` | English and Spanish (`data-text` keys), the theme switch, tabs, copy buttons | With `page.html`; each page's texts in its `TEXTS` |
| `docusaurus-custom.css` | The same tokens mapped onto Docusaurus' Infima, plus `.fl-hero`, `.fl-eyebrow`, `.fl-cards` for a home page | A Docusaurus site's `src/css/custom.css` |
| `logo.svg` | The family's mark (agent-extensions'): a coral square over three indigo ones | The shapes and colors a project's own mark follows |
| `docusaurus/Terminal/`, `docusaurus/Prompt/`, `docusaurus/MDXComponents.tsx` | The terminal window and the request box as React components (from moodle-mcp's docs), and the file that makes them usable in every page | A Docusaurus site's `src/components/` and `src/theme/` (section 3b) |
| `docusaurus/plugins/deferred-hydration.js` | A `postBuild` plugin (from miyagi's docs) that starts Docusaurus' bundle once the page has loaded and painted, not during its first paint | A Docusaurus site whose Lighthouse mobile performance is under 90 (section 5b) |

## 1. The tokens

Every color is a token on `:root`, light by default, redefined for dark under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and again under `:root[data-theme="dark"]`, so the person's choice wins both ways (see `site.css`'s first lines). Never a literal color in a component rule.

| Token | Light | Dark | For |
| --- | --- | --- | --- |
| `--bg`, `--bg-2` | `#ffffff`, `#f7f8fa` | `#0b0d12`, `#10131a` | The page; quiet panels and the theme switch |
| `--panel` | `#ffffff` | `#141821` | Cards, dialogs, the install card |
| `--line`, `--line-2` | `#e7e9ee`, `#d9dde5` | `#232836`, `#2e3445` | Hairlines; inputs' borders |
| `--text`, `--text-2`, `--dim` | `#1c1e21`, `#4b5260`, `#747b8a` | `#eceff4`, `#b3bac7`, `#8b93a3` | Body, secondary, labels and versions |
| `--accent`, `--accent-hover` | `#e5483a`, `#c93b2e` | `#ff6b57`, `#ff8574` | Links, primary buttons, the eyebrow, active tabs and chips |
| `--accent-ink` | `#ffffff` | `#1a0b08` | Text on the accent |
| `--accent-soft`, `--glow` | coral at 8% and 10% | coral at 12% | Highlighted notes; the hero's radial glow |
| `--chip`, `--code`, `--button-2` | `#f1f3f6`, `#f4f5f8`, `#eceef2` | `#1b202b`, `#181c26`, `#1e2430` | Tags, code, secondary buttons |
| `--b1`, `--b2`, `--b3` | `#2e3a8c`, `#4453b8`, `#6272de` | `#8a97f0`, `#6272de`, `#4453b8` | The mark's indigo squares |
| `--shadow`, `--shadow-lift` | two soft layers | darker | Cards at rest; cards on hover, dialogs, the install card |

The accent is coral in every Falken's Lab project: a product's own color (Moodle's orange, a client's brand) goes in its logo or a screenshot, not in the interface. `body` always sets `background: var(--bg)`.

## 2. Type

- **Inter** for everything (400 to 900), **JetBrains Mono** for code, commands, versions and the brand name in the top bar; from Google Fonts with `display=swap`, and a system fallback stack (`--sans`, `--mono`). Where mobile performance matters (a Docusaurus site measured with Lighthouse), serve them from the site instead: the variable Latin and Latin Extended `woff2` from Fontsource (`https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@5.2.6/latin-wght-normal.woff2`, `latin-ext-…`, and `jetbrains-mono:vf@…`) in `static/fonts/`, their `@font-face` rules inline in the head (`headTags`), the Latin faces preloaded, and `font-display: optional`: a stylesheet from Google holds the first paint, and with `swap` the text that is the page's LCP is painted again when the font arrives.
- Body 16px, line height 1.55, `-webkit-font-smoothing: antialiased`.
- Headings heavy and tight: the hero's title 900 weight, `letter-spacing: -0.045em`, `clamp(40px, 7vw, 72px)`, `max-width: 16ch`; section titles 800, `-0.03em`; `text-wrap: balance` on all of them.
- Running text at most about 60 characters wide (`max-width: 60ch`).
- Labels and the eyebrow: 12–13px, 700, uppercase, `letter-spacing: 0.1–0.12em`, in the accent.

## 3. The pieces

- **Top bar** (`.nav`): sticky, 60px, the page's background at 88% with `backdrop-filter: saturate(1.4) blur(10px)`, a hairline under it. Left: the mark (28px) and the project's name in mono 700. Then the links (15px, 500). Right: the language switch (`EN | ES`) and the theme switch (sun, moon, screen) as segmented controls (`.seg`, the active one raised on `--panel`), the GitHub icon, and a small primary button. Under 860px the links go; under 600px the button and the name too.
- **Hero** (`.hero`): centered, padding 84px top, the radial glow (`radial-gradient(55% 70% at 50% 0%, var(--glow), transparent 72%)`) behind it, the eyebrow ("Falken's Lab", underlined in the accent), the title, the intro in `--text-2`, then the buttons (`.ctas`: primary, secondary).
- **Install card** (`.add`): a panel with `--shadow-lift`, 16px corners, a tab per client (`.tablist`, underlined in the accent when active), each with a copyable command (`code.cmd` in mono on `--code` with a small "Copy" button).
- **Cards** (`.concept`, `.card`): `--panel`, 1px `--line`, 14–16px corners, `--shadow`; on hover a 3px lift, `--shadow-lift` and a border tinted with the accent. One emoji per reason card, 26px. A catalog card: the logo (48px, 12px corners), the name 800 and its version in mono `--dim`, the description in three lines at most, the tags at the bottom.
- **Chips and tags**: pills (`border-radius: 999px`); a filter chip turns accent when on; a tag is `--chip` with `--dim` text.
- **Buttons** (`.btn`): 8px corners, 700, primary in the accent with `--accent-ink`, secondary on `--button-2`.
- **Steps** (`.steps`): numbered circles in the accent, a title 800 and the text in `--text-2`.
- **A note that matters** (`.need`): `--accent-soft` background, 10px corners. For commands and example requests, see 3b.
- **Dialogs**: 18px corners, `--shadow-lift`, a blurred dark backdrop.
- **Footer**: centered, `--dim`, 14px, a hairline above, and only the signature: "Made with 💖 by Falken's Lab Team" (falkenslab-docs).

## 3b. Commands and example requests

What the reader types never shows as a bare code block or a quote: it shows where they'll type it.

- **A command** is a terminal window: dark in both themes (`#16181d`), a bar with the three traffic lights, a title (`Terminal`, `PowerShell`) and a **Copy** button that copies the commands only; each command after a `$` in the accent (`#ff6b57`), output lines quieter (`#c9ced8`). Several commands, one window. In Docusaurus, `<Terminal>{`$ claude mcp add …`}</Terminal>` (lines starting with the prompt are commands; `prompt="PS>"` and `title="PowerShell"` for Windows); in a static page, `.term` (`.bar` with three `.dot`, `.title`, `.copy`; `pre` with `.sign` and `.out`).
- **An example request to an AI agent** is the message box of an AI app: `--panel`, 1px `--line`, 16px corners, `--shadow`; the text as typed (wrapped, line breaks kept); a quiet bar under it (a `+` on the left, a microphone on the right, in `--text-2`); and the **send button** in the accent, 32px, 9px corners, an up arrow, which copies the request. In Docusaurus, `<Prompt>{`List my Moodle courses.`}</Prompt>`; in a static page, `.prompt` (`p`, `.bar` with `.spacer`, `button.send`).
- **A file** to write or edit (JSON, TOML, YAML) stays a code block, titled with its name (```` ```json title="claude_desktop_config.json" ````).

Write both components' text as a template literal (`` {`…`} ``) so quotes, braces and `<` in it don't break the MDX. A request that's a step in a flow ("Then: Yes, create it") gets its own box too.

## 4. Behavior

- Themes: light, dark, or the system's (no attribute), remembered in `localStorage` (`theme`), applied by a tiny script in `<head>` before the page paints, so it never flashes.
- Languages: English and Spanish, from `?lang=`, then the last choice (`localStorage` `lang`), then the browser's; the switch updates the URL with `history.replaceState`. Every text of the page in both (`site.js`'s `TEXTS`).
- Accessible: `aria-pressed` on the switches, `aria-selected` on tabs, `:focus-visible` outlined in the accent, `prefers-reduced-motion` turns transitions off.
- Responsive: one column under 600px, nothing wider than the screen, the 20px side gutter respecting the safe areas (`.wrap`).
- Open Graph and Twitter cards with a 1280×640 `social-card.png`, and the mark as the favicon (an SVG that follows the system's theme).

## 5. A Docusaurus site

1. Copy `templates/docusaurus-custom.css` to `src/css/custom.css` (keep the project's own additions below it, such as moodle-mcp's tools inputs box).
2. In `docusaurus.config`: the fonts as `stylesheets: [{ href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" }]`; `colorMode: { respectPrefersColorScheme: true }`; the navbar with the project's mark and name, a locale dropdown (`en`, `es`) and the GitHub link; the footer `style: "light"` with only the signature as `copyright` (falkenslab-docs).
   - The navbar reaches every section of the manual: a `type: "doc"` item per main page and a `More` dropdown for the rest, the version dropdown labelled short (`Next`, not `Next (unreleased)`: the page's banner says it), and the GitHub link as an icon (`className: "header-github-link"`). Docusaurus marks every doc item of the current sidebar active, so the template keeps them neutral; the sidebar says where the reader is.
   - **Four links at most** before `More`: Docusaurus folds the navbar into the phone menu only under 997px, and between that and about 1300px more links (longer in Spanish, or with the `Next` version) run into the right-hand items without overflowing the page. The template tightens the links under 1400px and, between 997 and 1200px, keeps only the language switch's icon, narrows the search box and drops its keyboard hint.
   - The navbar's `backdrop-filter` makes it the containing block of its fixed children: the template turns it off while the phone menu is open (`.navbar-sidebar--show`), or that menu is clipped to the bar's 60px.
   - The project's mark in the navbar at 28px, as `logo: { src, srcDark }`: an SVG that switches with `prefers-color-scheme` follows the system, not the site's theme switch, so give it a light and a dark file. The project's own colors stay in its mark; the interface is the family's coral.
   - The GitHub link as its icon: `{ href, position: "right", className: "header-github-link", "aria-label": "GitHub" }`; the template's `.header-github-link` draws it with a CSS mask in the navbar's link color, the accent on hover.
3b. Copy `templates/docusaurus/Terminal/` and `Prompt/` to `src/components/`, and `templates/docusaurus/MDXComponents.tsx` to `src/theme/`: every page can then use `<Terminal>` and `<Prompt>` without an import (section 3b). The copy button's label goes through `translate` (`terminal.copy`, `prompt.copy`): add them to each locale's `code.json`.
3. A home page (`src/pages/index`) built from `.fl-hero`, `.fl-eyebrow` and `.fl-cards`, as `page.html`'s hero, its install card (a tab per app) and cards whose count fills the rows (6 or 9 in threes); the docs keep Docusaurus' layout. moodle-mcp's `docs/src/pages/index.tsx` is a worked example.
4. Build in both languages and look at both themes.

## 5b. Docusaurus: performance and two languages

- **Mobile performance at 90 or more.** Docusaurus' bundle (~500 kB) is evaluated during the first paint, and Lighthouse's mobile simulation charges that work to the LCP (89 and below on text pages whose real LCP is 0.4 s). Copy `templates/docusaurus/plugins/deferred-hydration.js` to `plugins/` and add `plugins: ["./plugins/deferred-hydration.js"]`: after the build it keeps the bundle's scripts as `data-hydrate` and a small loader adds them once the page has loaded *and* painted its first content (in headless the load event can come first). The pages are server-rendered, so nothing is lost but a few hundred milliseconds of interactivity. Measure with Lighthouse 12 against the build served under its base URL with gzip, three runs per page, the median; check with a browser that the page hydrates (`data-has-hydrated="true"`), the theme and the phone menu work, and links navigate.
- **English and Spanish.** `i18n.locales` with a `localeDropdown` in the navbar; the pages of the other language in `i18n/<locale>/docusaurus-plugin-content-docs/current/` with the same paths, and `navbar.json`/`footer.json` from `write-translations`.
  - A translated heading keeps the original's anchor as an explicit id (`## Your materials {#tus-materiales}`), computed with `github-slugger` before translating, so links with `#anchors` work in both languages.
  - A page left untranslated is served in the default language; its links to translated pages must be absolute (`/advanced/page/`), since a relative `.md` link from it doesn't resolve in the other locale's build.
  - A home page written in JSX without `<Translate>` is translated as a copy in `i18n/<locale>/docusaurus-plugin-content-pages/index.js`, importing the same CSS module with `@site/src/pages/index.module.css`; both are kept in step.
  - Per-locale description and social card: `process.env.DOCUSAURUS_CURRENT_LOCALE` in `docusaurus.config` (the build runs once per locale).
- **Contrast in the dark theme.** The coral on Docusaurus' tinted backgrounds falls under 4.5:1 in two places: code inside a link, and the sidebar's current page. Give them the lightest primary (`--ifm-color-primary-lightest`).

## 6. Checking a page

- Both themes, and "system" with the operating system's dark mode on: no color left from the other theme, the accent readable on both.
- At 400px wide: no horizontal scroll, the top bar's switches still there; the phone menu opens full height, with its dropdowns.
- At 1000, 1100, 1200 and 1280px, in each language and on a `Next` page: the navbar's left items end before its right-hand ones begin (measure their boxes: overlapping items don't overflow the page, so an overflow check misses them).
- No command outside a terminal window and no example request outside a request box (`grep` the docs for ```` ```bash ```` and lines starting with `>`).
- English and Spanish: every text switches, nothing left in the other language.
- Links work (`curl -sI`), the fonts load, the favicon shows.
- Screenshots of a page for a README or a post: real, from a browser (headless Chrome, as the `falkenslab-terminal-screenshots` skill captures and frames terminals).
