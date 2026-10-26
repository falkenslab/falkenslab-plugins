# falkenslab-style

El estilo de la casa de Falken's Lab para Claude Code: cómo se escriben los README y los sitios de documentación, cómo se ven las webs, cómo se hacen las capturas de terminal y cómo se escribe el Markdown. Las skills `falkenslab-*` solo se aplican en repositorios cuyo `origin` está en `github.com/falkenslab`.

## Skills

- **[falkenslab-docs](./skills/falkenslab-docs/)**: README y sitios de documentación de Falken's Lab.
- **[falkenslab-site-style](./skills/falkenslab-site-style/)**: el estilo visual de las webs y los sitios Docusaurus, con plantillas.
- **[falkenslab-terminal-screenshots](./skills/falkenslab-terminal-screenshots/)**: capturas de terminal enmarcadas como una ventana de macOS.
- **[markdown-writing](./skills/markdown-writing/)**: reglas de Markdown y un script que aplica las mecánicas.

## Instalación

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-style@falkenslab-plugins
```

## Requisitos

Node.js para los scripts de `markdown-writing` y `falkenslab-terminal-screenshots`, y Google Chrome para enmarcar las capturas.
