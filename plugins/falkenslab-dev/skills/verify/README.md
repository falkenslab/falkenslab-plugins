# verify

Pasa la batería de calidad del repo (typecheck, lint, tests, build, comprobaciones propias y el sitio de documentación) y se para en el primer fallo. Toma los pasos de la skill `verify` del propio repo si la tiene, o de lo que ejecuta su CI.

## Instalación

Viene con el plugin `falkenslab-dev`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-dev@falkenslab-plugins
```

## Uso

```
/falkenslab-dev:verify
```
