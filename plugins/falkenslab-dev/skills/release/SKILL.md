---
name: release
description: Cut a release of a Falken's Lab repository (origin under github.com/falkenslab) - check the preconditions, decide the semver bump from the commits since the last tag, bump the version, write the release notes and docs, commit, tag, push, create the GitHub release and publish to npm when the package is public. Only when the owner explicitly asks to release or publish.
disable-model-invocation: true
---

# Release

A release is a version commit, a `vX.Y.Z` tag on the default branch, a GitHub release with its notes and, for a published package, the same version on npm (usually `@falkenslab/<name>`). Nothing is pushed or published without the owner asking.

If the repository has its own `.claude/skills/release/SKILL.md`, follow that one instead: it knows the project's extra steps (installers, sibling packages, versioned docs).

## 1. Preconditions

Stop and report at the first that fails:

- A GitHub remote exists (`git remote get-url origin`). Never create the repository yourself.
- On the default branch, working tree clean, up to date (`git fetch && git status -sb`). Uncommitted work: ask, or use the `commit` skill if the owner wants it included.
- No `file:` dependencies on sibling packages left from a local try: they must be published versions.
- The `verify` skill is green, the docs site included.
- `gh auth status` works. For npm: `npm whoami` works (if not, ask the owner to run `npm login`: it's interactive); `package.json` has `"publishConfig": { "access": "public" }` (a scoped package is private by default) and no `"private": true`.
- The documentation describes every change since the last tag (`update-docs`).

## 2. Decide the bump

`git describe --tags --abbrev=0` (none: the first release, of the version already in `package.json`, confirmed with the owner), then `git log <tag>..HEAD --format=%s`. While `0.x`: **minor** for any `feat` or breaking change (`!`, `BREAKING`, something removed or renamed, an input or output changed incompatibly); **patch** for `fix`, `docs`, `refactor`, `chore`, `build`, `test` only. **major** only when the owner declares `1.0.0`. If nothing but docs or chores changed, say a release may not be worthwhile and confirm first. State the bump and why; ask if it's ambiguous.

## 3. Bump, notes and docs

`npm version <patch|minor> --no-git-tag-version` (or the project's version file), and `grep -rn "<old version>" README.md src docs/content` in case one slipped in. Draft the notes in English from the commits, grouped as new features, fixes, breaking changes (with what users must change) and internal, only what matters to users.

If the site has a releases page, add the version there in both languages. If it keeps versioned docs (`docs/versions.json`), snapshot this one (`npx docusaurus docs:version X.Y.Z` in `docs/`, the Spanish copy included), and remove the previous release's snapshot when the project keeps only the latest release and `/next`. The docs build must pass.

## 4. Commit, tag, push, publish

```
git add package.json package-lock.json docs <other version files>
git commit -q -F - <<'EOF'   # "chore(release): vX.Y.Z" plus the session's attribution trailer
git tag vX.Y.Z
git push origin <default branch>
git push origin vX.Y.Z
gh release create vX.Y.Z --verify-tag --title "vX.Y.Z" --notes "<notes>"
npm publish
```

Before publishing, `npm pack --dry-run`: only what the package should ship (no `.env`, profiles or scratch). With two-factor authentication, ask the owner for the code (`npm publish --otp=<code>`). If the owner prefers to publish themselves, hand them the exact command. A published version can't be reused: fix forward with a patch.

Tags are lightweight; never move or delete one, never force-push. If a step fails half-way, report exactly what is pushed and published and what isn't, instead of retrying blindly.

## 5. Verify the release

`git ls-remote --tags origin`, `gh release view vX.Y.Z`, `npm view <package> version` (a new version can take minutes to appear), the docs workflow for the release commit (`gh run list --limit 3`), and an install of `<package>@X.Y.Z` in the session scratchpad. Report the version, tag, release URL, npm page and notes, and which dependents must bump to it themselves.
