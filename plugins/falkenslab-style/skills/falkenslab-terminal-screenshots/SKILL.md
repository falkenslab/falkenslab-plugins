---
name: falkenslab-terminal-screenshots
description: The user's style for screenshots of a terminal in Falken's Lab projects (repositories under github.com/falkenslab) - always framed as a macOS window (red, yellow and green traffic lights, a centered bold title, rounded corners, a thin border and a soft shadow) on a transparent background, from a real session, never generated - plus how to capture one (a clean, scripted session of Claude Code, Codex or an agent-kit agent; Windows' PrintWindow capture) and frame it (scripts/frame.mjs, headless Chrome). Use whenever you take, frame or replace a screenshot of a terminal or CLI agent for a README, a documentation site, a release or a post in a falkenslab repository; check with `git remote get-url origin`.
---

# Falken's Lab terminal screenshots

Every screenshot of a terminal in a Falken's Lab project (a repository whose `origin` is under `github.com/falkenslab/`) looks like a macOS window, whatever system it was taken on:

- the three traffic lights at the top left: red `#ff5f57`, yellow `#febc2e`, green `#28c840`;
- a bold title centered in the title bar: the app or agent's name (`Claude Code`, `Codex`, `Captain Whiskers`), never the OS's window title or a path;
- the title bar the same color as the terminal's background, so window and content are one piece;
- rounded corners (12 px), a thin border and a soft shadow;
- a transparent background around it (a PNG with alpha), so it sits on any page, light or dark.

The content is a real session, captured, never generated or mocked up (the `bitmap-images` skill says why). The README's 📸 section and the docs' pages follow the `falkenslab-docs` skill: about 760 px wide on the page, a one-line caption, an absolute `raw.githubusercontent.com` URL when the README ships in a package.

## 1. Stage a clean session

What the screenshot shows is what readers believe the tool does, so the session must be real and readable:

- **A demo that fits one screen**: one prompt, a few tool calls, a clear result. Prepare its inputs first (a small lab, a sample folder) and pull or download what it needs, so it runs fast.
- **Short paths**: tool results print paths; a demo folder like `~/labs` reads better than a temporary one. Remove it afterwards.
- **Only the tools that matter**: for an MCP server, connect only it and keep the agent from wandering through files. Claude Code: `--mcp-config <file> --strict-mcp-config --allowedTools "mcp__<server>__*" --disallowedTools Bash Read Glob Grep`. Codex: `-c mcp_servers.<server>.command=…` overrides, and `-c "developer_instructions='Use only the <server> MCP tools.'"`.
- **The prompt first** on the command line: `--allowedTools`, `--disallowedTools` and `--mcp-config` take several values and swallow a prompt placed after them.
- **The language of the page**: English for the README and the English docs, Spanish for the Spanish ones. The person's own settings may impose another: in Claude Code, `--setting-sources project,local --append-system-prompt "Always answer in English."`; in Codex, `developer_instructions`.
- **In color**: an inherited `NO_COLOR` (agents and CI often set it) turns the whole session gray; clear it in the launcher (`set "NO_COLOR="`, `unset NO_COLOR`) and set `COLORTERM=truecolor`.
- **No noise**: clear the parent's environment (`CLAUDE_*` variables leak warnings into a child Claude Code), turn off update notices (Codex: `-c check_for_update_on_startup=false`), and run it once beforehand if it updates itself on start.
- **The person's decisions stay theirs**: a "do you trust this folder?" prompt is answered by the person, never typed in for them. Answering the agent's own question inside the demo ("May I start it?" → "Yes") is part of the scene.
- **Window**: launch it with a known title and a size that fits the whole answer, e.g. on Windows `wt -w new --size 104,42 --title demo --suppressApplicationTitle cmd /c demo.cmd`. Wait for the result by its effect (a container up, a file written), not with a fixed sleep.

## 2. Capture the window

- **Windows**: `${CLAUDE_SKILL_DIR}/scripts/capture-window.ps1 -Title demo -Out raw.png [-Restore]` captures the window even when others cover it. It includes Windows Terminal's own title bar and border, which frame.mjs crops.
- **macOS**: `screencapture -o -l <window-id> raw.png` (`-o` leaves the system shadow out).
- **Linux**: `import -window <id> raw.png` (ImageMagick) or the desktop's screenshot tool on the window.

Look at the capture before going on: the whole prompt and answer visible, nothing private (tokens, emails, other people's names), no stray warnings.

## 3. Frame it

```bash
node "${CLAUDE_SKILL_DIR}/scripts/frame.mjs" raw.png shot.png --title "Claude Code" --crop 41,8,8,8 --bg "#0c0c0c" --scale 2
```

- `--crop top,right,bottom,left`: what to cut from the capture first, the OS's title bar and border, and empty rows at the bottom. Measure it: the first and last rows and columns of the terminal's background color.
- `--bg`: the terminal's background color, sampled from the capture, so the title bar matches.
- `--scale 2`: a 2x PNG, crisp on retina screens (the page shows it at half size); it doesn't add detail the capture lacks, so capture large.
- `--width`: the content's width in CSS pixels, when it must differ from the capture's.
- The script needs Node and Chrome or Edge (`CHROME` points to another browser); the page it renders lives in a temporary folder that it removes.

Check the result: transparent corners (alpha 0), the shadow fading out inside the margin, the title centered, nothing cut at the edges. Save it where the project keeps its images (`docs/static/img/` in a Docusaurus site), with a name that says what it shows (`see-it-claude-code.png`).
