# falkenslab-plugins

A personal marketplace of Claude Code plugins. Each plugin is a self-contained package that can include skills, hooks, MCP servers, and commands — installed independently.

## Repository structure

```
falkenslab-plugins/
├── .claude-plugin/
│   └── marketplace.json        # Global plugin registry (index of all plugins)
└── plugins/
    └── <plugin-name>/
        ├── .claude-plugin/
        │   └── plugin.json     # Plugin metadata (name, description, version)
        ├── skills/
        │   └── <skill-name>/
        │       ├── SKILL.md    # Skill prompt loaded by Claude Code
        │       └── README.md   # Description, installation, usage examples
        ├── hooks/
        │   └── <hook-name>/
        │       ├── hook.sh
        │       └── README.md
        ├── mcp/
        │   └── <server-name>/
        │       └── README.md
        └── commands/
            └── <command-name>/
                └── README.md
```

## Marketplace registry

`/.claude-plugin/marketplace.json` is the root index. Every plugin in the repo must have an entry here:

```json
{
  "name": "falkenslab-plugins",
  "owner": { "name": "Falken's Lab Team" },
  "plugins": [
    {
      "name": "plugin-name",
      "source": "./plugins/plugin-name",
      "description": "One-line description of what the plugin does."
    }
  ]
}
```

## Plugin metadata

Each plugin declares its own identity in `plugins/<name>/.claude-plugin/plugin.json`:

```json
{
  "name": "plugin-name",
  "description": "One-line description.",
  "version": "0.1.0"
}
```

Use semantic versioning (`major.minor.patch`). Start at `0.1.0` for new plugins.

## Plugin component types

A plugin is a package. Inside it, components are organized by type:

| Type | Directory | File | Invocation |
|------|-----------|------|-----------|
| Skill | `skills/<name>/` | `SKILL.md` | `/skill-name` in Claude Code |
| Hook | `hooks/<name>/` | `hook.sh` | Automatic, on Claude Code events |
| MCP server | `mcp/<name>/` | entrypoint file | Tool calls from Claude |
| Command | `commands/<name>/` | script file | `! command` in terminal |

## Conventions

**All components:**
- Every component directory must have a `README.md` with: description, installation steps, and at least one usage example.
- Component names use `kebab-case`.
- No hidden dependencies — document all required env vars, tools, or packages upfront.

**Skills (`SKILL.md`):**
- The file name is `SKILL.md` (uppercase).
- Must be fully self-contained — the prompt alone drives behavior, no runtime imports.

**Hooks (`hook.sh`):**
- Must be idempotent.
- Exit 0 on success; non-zero only on genuine errors.

**MCP servers:**
- Document every tool signature: name, input parameters, output format.

**Commands:**
- Prefer shell scripts over compiled binaries for portability.

## Installing a plugin component

Refer to each component's `README.md` for exact steps. Common patterns:

**Skill** — add to `~/.claude/settings.json`:
```json
{
  "skills": [
    { "name": "skill-name", "path": "/path/to/plugins/<plugin>/skills/<skill>/SKILL.md" }
  ]
}
```

**Hook** — add to `~/.claude/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{ "type": "command", "command": "/path/to/plugins/<plugin>/hooks/<hook>/hook.sh" }]
    }]
  }
}
```

**MCP server** — add to `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "server-name": { "command": "node", "args": ["/path/to/plugins/<plugin>/mcp/<server>/index.js"] }
  }
}
```

## Adding a new plugin

1. Create `plugins/<name>/` and `plugins/<name>/.claude-plugin/plugin.json`.
2. Add component directories as needed (`skills/`, `hooks/`, etc.) with their implementation files.
3. Write a `README.md` for each component.
4. Register the plugin in `/.claude-plugin/marketplace.json`.
5. Test locally inside a Claude Code session before committing.

## Current plugins

| Plugin | Version | Description |
|--------|---------|-------------|
| `falkenslab-dev` | 0.1.0 | Development workflow: commit, verify, update-docs, release, sync-issues, upgrade-deps, add-tool |
| `falkenslab-style` | 0.1.0 | House style: READMEs and docs sites, web look, terminal screenshots, Markdown rules |
