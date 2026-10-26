# falkenslab-dev

El flujo de desarrollo de Falken's Lab para cualquiera de sus repositorios: commits, verificación, documentación, versiones, issues y dependencias. Son versiones genéricas de las skills que cada repo tenía en `.claude/skills/`: toman los detalles del proyecto de su `CLAUDE.md`, `.minispec/`, `package.json` y CI. Si un repo tiene su propia versión de una skill, esta le cede el paso.

## Skills

- **[commit](./skills/commit/)**: commits atómicos con Conventional Commits en inglés.
- **[verify](./skills/verify/)**: la batería de calidad del repo, parando en el primer fallo.
- **[update-docs](./skills/update-docs/)**: la documentación al día, en inglés y en español.
- **[release](./skills/release/)**: versión, etiqueta, release de GitHub y publicación en npm (solo a petición).
- **[sync-issues](./skills/sync-issues/)**: notas de MiniSpec e issues de GitHub sincronizados.
- **[upgrade-deps](./skills/upgrade-deps/)**: actualización de dependencias paquete a paquete.
- **[add-tool](./skills/add-tool/)**: herramientas nuevas en servidores MCP hechos con `mcp-server-template`.

## Instalación

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-dev@falkenslab-plugins
```

## Requisitos

Git y, según la skill, Node.js con npm y la CLI de GitHub (`gh`) con sesión iniciada. Las skills de MiniSpec (`minispec-*`) vienen en el plugin `minispec`.
