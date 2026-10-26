# markdown-writing

Las reglas para escribir Markdown: una línea por párrafo y por elemento de lista, sin separadores horizontales entre secciones, sin tablas con la cabecera vacía y una fila por comando. Incluye `scripts/fix-markdown.mjs`, que aplica las reglas mecánicas sobre un fichero (requiere Node.js).

## Instalación

Viene con el plugin `falkenslab-style`. Añade el marketplace `falkenslab/falkenslab-plugins` e instala el plugin:

```
/plugin marketplace add falkenslab/falkenslab-plugins
/plugin install falkenslab-style@falkenslab-plugins
```

## Uso

Claude la carga al escribir o editar cualquier fichero Markdown. Para arreglar uno existente:

```
/falkenslab-style:markdown-writing arregla docs/guide.md
```
