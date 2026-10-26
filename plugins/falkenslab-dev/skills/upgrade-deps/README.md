# upgrade-deps

Actualiza las dependencias paquete a paquete (o por familias): lee las notas de versión, revisa lo que el proyecto usa de cada una, pasa `verify` y hace un commit por actualización.

## Instalación

Viene con el plugin `falkenslab-dev`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-dev@falkenslab-plugins
```

## Uso

```
/falkenslab-dev:upgrade-deps actualiza el SDK de MCP
```
