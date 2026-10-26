# release

Saca una versión: comprueba las precondiciones, decide el salto semver a partir de los commits, sube la versión, escribe las notas y la documentación, hace commit, etiqueta, sube, crea la release de GitHub y publica en npm. Solo se ejecuta cuando la invocas tú. Requiere `gh` y, para publicar, una sesión de `npm`.

## Instalación

Viene con el plugin `falkenslab-dev`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-dev@falkenslab-plugins
```

## Uso

```
/falkenslab-dev:release
```
