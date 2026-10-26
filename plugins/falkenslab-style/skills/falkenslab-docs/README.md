# falkenslab-docs

Las reglas de la documentación de los proyectos de Falken's Lab: el README rico al estilo de moodle-mcp (hero centrado con logo y badges, enlaces a la documentación en inglés y español, secciones con emoji, inicio rápido, captura real) y la firma "Made with 💖 by Falken's Lab Team" como único pie. Solo se aplica en repositorios cuyo `origin` está en `github.com/falkenslab`.

## Instalación

Viene con el plugin `falkenslab-style`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-style@falkenslab-plugins
```

## Uso

Claude la carga sola al escribir o editar un README o un sitio de documentación en un repo de falkenslab. También se puede invocar:

```
/falkenslab-style:falkenslab-docs reescribe el README de este proyecto
```
