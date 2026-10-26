# sync-issues

Sincroniza las notas de MiniSpec (`.minispec/features/`) con los issues de GitHub, en inglés: abre y enlaza el issue que le falta a una nota, cierra con un resumen de la solución el de una nota terminada e informa de los issues abiertos sin nota. Requiere `gh` y un remoto en GitHub.

## Instalación

Viene con el plugin `falkenslab-dev`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-dev@falkenslab-plugins
```

## Uso

```
/falkenslab-dev:sync-issues
```
