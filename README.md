# Falken's Claude Plugins

Marketplace personal de plugins para [Claude Code](https://claude.ai/code) — skills, hooks, servidores MCP y comandos que amplían tu flujo de trabajo con Claude Code.

Cada plugin es independiente y se puede instalar por separado.

## Plugins disponibles

| Plugin                                          | Versión | Descripción                                                                                     |
| ----------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| [falkenslab-dev](./plugins/falkenslab-dev/)     | 0.1.0   | Flujo de desarrollo: commit, verify, update-docs, release, sync-issues, upgrade-deps y add-tool |
| [falkenslab-style](./plugins/falkenslab-style/) | 0.1.0   | Estilo de la casa: README y docs, webs, capturas de terminal y Markdown                         |
| [minispec](https://github.com/falkenslab/minispec/tree/master/integrations/claude) | 1.0.0 | Skills de MiniSpec: features, fixes y ADRs como especificaciones cortas            |

## Añadir el marketplace de plugins

Ejecutamos el comando built-in `/plugin` en Claude Code:

![alt text](docs/images/image.png)

Seleccionamos la pestaña "Marketplaces" y la opción "+ Add Marketplace":

![alt text](docs/images/image-1.png)

Introducimos nuestro repositorio de GitHub, `falkenslab/falkenslab-plugins` donde se encuentran los plugins:

![alt text](docs/images/image-2.png)

Seleccionamos el plugin que queremos instalar desde nuestro marketplace (en la captura, el antiguo `git-plugin`):

![alt text](docs/images/image-3.png)

Y finalmente indicamos el ámbito en el que queremos instalarlo:

![alt text](docs/images/image-4.png)

Ejecutamos el comando `/reload-plugins` para que Claude reconozca los nuevos plugins (si no funciona, reinicia `claude`) ¡y listo! 👍

## Estructura de un plugin

```
plugins/
└── <nombre-plugin>/
    ├── .claude-plugin/
    │   └── plugin.json       # Nombre, descripción y versión
    ├── skills/
    │   └── <nombre-skill>/
    │       ├── SKILL.md      # Prompt que carga Claude Code
    │       └── README.md
    ├── hooks/
    │   └── <nombre-hook>/
    │       ├── hook.sh
    │       └── README.md
    └── mcp/
        └── <nombre-servidor>/
            └── README.md
```

## Añadir un plugin

1. Crea `plugins/<nombre-plugin>/` siguiendo la estructura anterior.
2. Añade `.claude-plugin/plugin.json` con nombre, descripción y versión.
3. Escribe un `README.md` por componente (descripción + instalación + ejemplo de uso).
4. Registra el plugin en `.claude-plugin/marketplace.json`.

Consulta [CLAUDE.md](./CLAUDE.md) para las convenciones y guías completas.

## Referencias

* [Official Anthropic Plugin Marketplace](https://claude.com/plugins)
* [Claude Code Plugins Directory](https://github.com/anthropics/claude-plugins-official)
* [Create plugins](https://code.claude.com/docs/en/plugins)
* [Create and distribute a plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces)
* [Extend Claude with skills](https://code.claude.com/docs/en/skills)
* [Built-in commands](https://code.claude.com/docs/en/commands)