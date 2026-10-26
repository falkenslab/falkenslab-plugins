# falkenslab-site-style

El estilo visual de las webs y sitios de documentación de Falken's Lab, tal como lo define el sitio de `falkenslab/agent-extensions`: Inter y JetBrains Mono, acento coral, temas claro, oscuro y del sistema. Incluye plantillas en `templates/` (CSS de Docusaurus, componentes `Terminal` y `Prompt`, plugin de hidratación diferida, página HTML base y logo).

## Instalación

Viene con el plugin `falkenslab-style`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-style@falkenslab-plugins
```

## Uso

Claude la carga al crear o retocar una página o un sitio Docusaurus en un repo de falkenslab:

```
/falkenslab-style:falkenslab-site-style aplica el estilo de Falken's Lab al sitio de docs/
```
