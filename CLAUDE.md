# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Reglas de trabajo

Antes de modificar código existente, primero lee el archivo afectado y explica brevemente qué vas a cambiar. No realices modificaciones hasta que el usuario las autorice.

## Running the project

No build step or server required. Open `index.html` directly in a browser:

```bash
open index.html
```

## Architecture

Three-file project — no external dependencies, frameworks, or assets:
- `index.html` — HTML structure only.
- `css/style.css` — all styles.
- `js/script.js` — all counter logic.

**Counter logic** (`js/script.js`):
- `cuenta` is the single source of truth (starts at 0, minimum 0).
- Each button calls one function (`aumentar`, `disminuir`, `reiniciar`, `duplicar`) that updates `cuenta` and writes it to `#contador` via `textContent`.
- `disminuir` enforces the floor: `if (cuenta > 0) cuenta--`.

**Styling convention**: each button has its own `#id`-scoped CSS block for colors; shared button geometry is in the `button` selector. Follow this pattern when adding new buttons.

## Mantenimiento de documentación

Cuando un cambio aprobado modifique la arquitectura, estructura de archivos,
comandos de ejecución, dependencias o convenciones importantes del proyecto,
propón actualizar CLAUDE.md para mantenerlo sincronizado con el código.
