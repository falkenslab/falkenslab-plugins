---
name: add-tool
description: Checklist for adding or changing a tool in a Falken's Lab MCP server built from falkenslab/mcp-server-template (src/tools/, RegisterTool) - where the domain logic goes, the tool file (name, title, description, zod schemas, annotations, reply), registering it, requirements and settings, tests, the strict check and the docs. Use when adding a tool, or changing one's inputs, outputs or behavior.
---

# Adding an MCP tool

If the repository has its own `.claude/skills/add-tool/SKILL.md`, follow that one instead. This checklist is for servers that keep the template's layout: `src/tools/*.ts`, `TOOLS` in `src/tools/index.ts`, `src/requirements.ts`, `src/settings.ts`, `npm run check`.

## 1. The domain's logic goes in its own module

A tool is a schema, a description, annotations and a call (`.minispec/core/architecture.md`). The work itself (an API client, a parser, a file format) lives in a module under `src/` with its own tests, never inside the tool file. A tool is a task the person would name, never a raw HTTP call or a shell.

## 2. Write the tool

Copy the shape of an existing tool (`src/tools/serverInfo.ts` in the template): one file in `src/tools/`, exporting a `RegisterTool`.

- **Name**: snake_case verb and noun of the domain (`list_items`, `create_report`).
- **Title**: a few words for people.
- **Description**: written for the model: what it does in the domain's terms, what it takes (and which tool gives each id), what it returns and what to do with it. For writes, "confirm with the person first". For long lists, that it pages.
- **Schemas** with zod: every input `.describe()`d for an agent; an `outputSchema` matching what the handler returns. No nullable types and no unions of types: an optional field instead, which every client accepts.
- **Annotations**, always: `readOnlyHint: true` only when it changes nothing; for writes `readOnlyHint: false` plus `destructiveHint` and `idempotentHint`; `openWorldHint: true` when it talks to anything outside the machine.
- **Handler**: `async (input) => reply(await doTheWork(input))`. Long lists take `limit` and `offset` and return `more`.
- **A program installed apart** (Docker, ffmpeg…): add it to `REQUIREMENTS` in `src/requirements.ts` and start the handler with `await needs("<program>")`. Copy the requirement into the server's extension `plugin.json` in `falkenslab/agent-extensions` (`metadata["agent-kit"].requirements`).
- **Settings**: `setting("<VARIABLE>")` from `src/settings.ts`, never `process.env`. A required one that's missing (or arrived as an unexpanded `${user_config.*}`) makes the tool fail with what to set and how, never the server at startup.
- **State or caches**: under `dataDir()`. Logs: stderr only, never stdout (it's the protocol).

## 3. Register it

Add it to `TOOLS` in `src/tools/index.ts`, in the order clients should see it. `src/instructions.ts` changes only when agents need a usage rule the description can't carry.

## 4. Test

- `test/tools/<tool>.test.ts`: the tool through the in-memory client, against a fake of whatever it talks to, made-up data only. Cover the main path, the main error (as the agent reads it) and the annotations.
- The domain module gets its own tests next to it, mirroring `src/`.
- Run the `verify` skill: `npm run check` fails on a tool without a title, a description, both schemas or `readOnlyHint`.

## 5. Docs and commit

Run the `update-docs` skill: the regenerated tools reference (`npm run tools` in `docs/`), tool counts, and any page that explains the tool, in English and Spanish. Commit with the `commit` skill (`feat(tools): …`); if an input or output changed in a way existing clients would notice, say so in the body.
