---
name: commit
description: Create smart, atomic commits in a Falken's Lab repository (origin under github.com/falkenslab) following its conventions - Conventional Commits, English messages, one logical change per commit, staged by path, docs and verification first. Use whenever the user asks to commit, or when finishing a piece of work that should be committed.
---

# Smart commits

Commit each logical step as you finish it. Never push, and never create a remote, unless the owner asks.

## 0. The project's own rules first

If the repository has its own `.claude/skills/commit/SKILL.md`, follow that one instead: it knows the project. Otherwise read `CLAUDE.md` and, if present, `.minispec/core/conventions.md`; what they say wins over this skill. Look at `git log --oneline -15` for the scopes the project already uses.

## 1. Understand what changed

Run `git status --short` and `git diff --stat`, then read the diffs. Commit only what belongs to the work at hand, and mention anything unrelated instead of sweeping it in. Never commit build output (`dist/`, `build/`, `docs/build/`), `node_modules/`, scratch scripts, `.env` files or anything with credentials.

## 2. Verify

When the change is visible to users (an option, a tool, a command, a setting, a requirement, the build), run the `update-docs` skill first; then the `verify` skill. Do not commit a tree that fails the project's checks, nor a visible change without its documentation.

## 3. Group into atomic commits

One logical change per commit, ordered so each builds on the previous ones. Typical groups: a feature with its tests and docs, a refactor on its own, `.minispec/` decisions or cards on their own, dependency bumps on their own.

- Stage by path (`git add <paths>`), never `git add -A` blindly; check `git status --short` after staging.
- When one file mixes two concerns, split the hunks: `printf 'y\nn\n' | git add -p <file>`, then check `git diff --cached`.
- `git mv` for moves, and keep pure renames free of content changes.

## 4. Write the message

Format: `type(scope): description`, lowercase type, imperative, no trailing period. Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `build`, `test`, `ci`. Scope when useful (`tools`, `config`, `docs`, `deps`, `minispec`, or the project's own).

- English, subject and body.
- The body explains *why* (the problem, the constraint), not a line-by-line list.
- `Closes #N` when the commit completes an issue's work.
- End with the attribution trailer the session's instructions require (do not invent one).
- Pass the message through a HEREDOC (`git commit -q -F - <<'EOF'`).

## 5. Finish

`git status --short` (clean, unless you deliberately left unrelated changes) and `git log --oneline -n <commits made>`. Report the commits. Never use `--no-verify`, `--amend` on pushed commits, or force-push.
