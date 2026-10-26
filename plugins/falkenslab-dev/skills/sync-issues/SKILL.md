---
name: sync-issues
description: Keep a Falken's Lab repository's MiniSpec feature and fix notes (.minispec/features/) and its GitHub issues in sync, in English - open and link the issue a note lacks, close with a solution summary the issue whose note is done, and report open issues without a note. Use when the user asks to sync issues and features, after creating or finishing a note by hand, or when asked what's pending. Only once the repository has a GitHub remote.
---

# Sync features and issues

If the repository has its own `.claude/skills/sync-issues/SKILL.md`, follow that one instead. Every note in `.minispec/features/` (a feature `<slug>.md` or a fix `fix-<slug>.md`) has exactly one GitHub issue in this repository. Everything is in English: titles, bodies, comments and label descriptions.

## 0. Is there a repository?

`git remote get-url origin`. If there's none, stop and say so. Never create the GitHub repository yourself; the owner decides when, and whether it's public.

## 1. Collect both sides

```
ls .minispec/features/
gh issue list --state all --label feature --limit 100 --json number,title,state,body
gh issue list --state all --label fix --limit 100 --json number,title,state,body
gh issue list --state open --limit 100 --json number,title,labels,body
```

A note is linked when it has an `Issue: [#N](<issue URL>)` line right under its title. An issue is linked when its body's last line points to `.minispec/features/<file>.md`. The last list catches open issues with neither label, opened straight on GitHub.

## 2. Fix each mismatch

- **Note without an issue:** open one (`gh issue create --label feature` or `--label fix`; `gh label create` if missing). Title: what it achieves for someone who uses the project. Body: the problem and the proposal in a few sentences (not the note's wording), and a last line `` Feature: `.minispec/features/<slug>.md` `` (`Fix:` for a fix). Then add the `Issue:` line under the note's title, with a blank line before and after.
- **Note with an issue that isn't linked from it:** add the `Issue:` line.
- **Open issue without a note:** read it and tell the owner what it asks and whether it's a feature or a fix; with their yes, write its note from the template (`.minispec/templates/`), label the issue and add the note's line at the end of its body. A question, a duplicate or work for another repository needs no note. What it needs from a sibling repository goes in the note's context and the report.
- **Issue not in English:** translate its title and body with `gh issue edit`; don't open a duplicate.
- **Open issue whose note no longer exists:** the work is done or dropped. Find the commits (`git log --oneline -- .minispec/features/<file>.md` and after), then close it with a comment on the solution: what changed for users, the design choices, how it was verified, the commits (`gh issue close N --comment "…"`). If dropped, say why. Ask when you can't tell.
- **Closed issue whose note still exists:** ask whether to reopen the issue or delete the note.

Issues are public if the repository is: never put a real name, email or credential in one.

## 3. Commit

Commit the notes you wrote or linked (`docs(minispec): link <slug> to its issue`, with the session's attribution trailer); push only if asked. Report a table of notes and issues, what you opened, edited or closed, and the open issues still without a note.

## Rules

- One issue per note; search before creating.
- Never close an issue for work that isn't pushed.
- The notes' lifecycle (create, implement, delete) belongs to the `minispec-*` skills; this one repairs drift.
