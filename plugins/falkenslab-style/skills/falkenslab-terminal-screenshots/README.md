# falkenslab-terminal-screenshots

Capturas de terminal con el estilo de Falken's Lab: siempre enmarcadas como una ventana de macOS sobre fondo transparente, a partir de una sesión real. Incluye `scripts/capture-window.ps1` (captura en Windows con PrintWindow) y `scripts/frame.mjs` (enmarcado con Chrome headless). Requiere Node.js y Google Chrome.

## Instalación

Viene con el plugin `falkenslab-style`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-style@falkenslab-plugins
```

## Uso

```
/falkenslab-style:falkenslab-terminal-screenshots haz una captura de Claude Code usando la skill commit para el README
```
