# git-commit skill

Slash command `/commit` that analyzes pending git changes, groups them into logical commits with English titles and descriptions, and asks for confirmation before executing anything.

## What it does

1. Reads `git status` and `git diff HEAD` to understand all pending changes.
2. Groups related changes into separate, focused commits.
3. Drafts an English commit message (title + description) for each group.
4. Shows the full plan and waits for your approval.
5. Executes the commits only after you confirm.

## Installation

Add the skill to your `~/.claude/settings.json`:

```json
{
  "skills": [
    {
      "name": "commit",
      "path": "/path/to/falkenslab-plugins/skills/git-commit/skill.md"
    }
  ]
}
```

Replace `/path/to/falkenslab-plugins` with the actual path where you cloned this repo.

## Usage

Inside a Claude Code session, from any git repository:

```
/commit
```

Claude will analyze the changes, propose a commit plan, and ask:

```
Proceed with these 3 commits? (yes / edit / cancel)
```

- **yes** — executes all commits in order
- **edit** — lets you adjust titles, descriptions, or grouping
- **cancel** — aborts, no changes made

## Example output

```
Planned commits:

1. [src/auth/oauth.py, src/auth/__init__.py]
   Add OAuth2 authentication provider
   Implements the OAuth2 flow using the authlib library. Replaces the
   previous session-based login for third-party providers.

2. [tests/test_oauth.py]
   Add tests for OAuth2 authentication provider

3. [docs/auth.md]
   Document OAuth2 setup and configuration

Proceed with these 3 commits? (yes / edit / cancel)
```

## Notes

- Works only inside a git repository.
- Never stages with `git add .` — each commit stages only its specific files.
- Untracked files that look relevant are surfaced and you decide whether to include them.
