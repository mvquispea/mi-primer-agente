---
name: revisar-codigo
description: Realiza una code review de los cambios de la rama actual antes de publicarlos — analiza el diff en busca de bugs, casos borde, duplicación, mantenibilidad, regresiones y seguridad, y clasifica los hallazgos por severidad. No modifica archivos.
---

# /revisar-codigo

Realiza una code review de los cambios de la rama actual, comparados contra la rama base, sin modificar ningún archivo.

## Paso 1 — Determinar rama base

Antes de revisar los cambios, determina la `RAMA_BASE` de la rama actual. No asumas que es `main`.

1. Obtén la rama actual: `git branch --show-current`.
2. **Señal 1 — rama por defecto del remoto:** `git symbolic-ref refs/remotes/origin/HEAD` (si existe, indica la rama que el remoto considera por defecto, p. ej. `refs/remotes/origin/main`).
3. **Señal 2 — punto de divergencia:** identifica las ramas candidatas presentes en el repo (`git branch -a`) entre `main`, `master`, `develop`, `preprod`, `staging`, `production` (excluyendo la rama actual). Si una candidata no existe como rama local pero sí como `origin/<candidata>`, usa esa referencia remota. Para cada candidata disponible, calcula `git merge-base <candidata> <rama-actual>`. La candidata cuyo merge-base sea el commit más reciente es la más probable.
4. **Decisión conservadora:**
   - Si **ambas señales coinciden** en la misma rama → hay confianza suficiente: úsala como `RAMA_BASE` sin preguntar.
   - Si **cualquiera de las señales falta, no coincide, o hay ambigüedad** (varias candidatas empatadas, ninguna candidata clara, remoto no configurado, etc.) → **detente y pregunta al usuario** cuál es la `RAMA_BASE` antes de continuar. No asumas ni elijas una candidata por tu cuenta en este caso.

## Paso 2 — Estado Git

Ejecuta en paralelo:
- `git status` — detecta archivos untracked.
- `git diff <RAMA_BASE>...HEAD` — commits ya realizados en la rama frente a `RAMA_BASE`.
- `git diff` — modificaciones unstaged de archivos ya trackeados.
- `git diff --cached` — cambios staged todavía no commiteados.

Si `git status` reporta archivos sin seguimiento (*untracked*) relevantes para la feature, lee su contenido completo — ninguno de los tres `git diff` anteriores lo incluye.

Considera en conjunto las cuatro fuentes (commits, unstaged, staged, untracked) antes de emitir conclusiones: los cambios de la rama actual no son solo los ya commiteados.

Presenta la rama actual, la `RAMA_BASE` utilizada y un resumen de los archivos afectados.

## Paso 3 — Alcance del análisis

Analiza **únicamente** los cambios introducidos en la rama actual (las fuentes obtenidas en el Paso 2). No evalúes código preexistente que no haya sido tocado, salvo que sea imprescindible para entender el impacto de un cambio.

## Paso 4 — Revisión

Para cada archivo modificado, busca específicamente:
- **Bugs o errores lógicos.**
- **Casos borde** no contemplados (valores límite, nulos, vacíos, entradas inesperadas).
- **Duplicación innecesaria** de código.
- **Problemas de mantenibilidad** (nombres poco claros, funciones sobrecargadas, acoplamiento excesivo).
- **Posibles regresiones** en funcionalidad existente.
- **Problemas de seguridad**, cuando corresponda (validación de entradas, datos sensibles, inyección, etc.).

## Paso 5 — Clasificación de hallazgos

Clasifica cada hallazgo con una de estas severidades:
- **CRÍTICO** — rompe funcionalidad, introduce un bug grave o un riesgo de seguridad.
- **IMPORTANTE** — afecta calidad, mantenibilidad o puede causar problemas en ciertos escenarios.
- **MEJORA** — sugerencia opcional que no bloquea la publicación.

Para cada hallazgo, indica:
1. **Archivo y zona del código** (ruta y línea o función aproximada).
2. **Por qué es un problema.**
3. **Solución propuesta.**

## Paso 6 — Resultado

Presenta los hallazgos agrupados por severidad (CRÍTICO primero, luego IMPORTANTE, luego MEJORA).

Si no se encuentran problemas CRÍTICOS o IMPORTANTES, indícalo claramente (por ejemplo: "No se encontraron problemas críticos ni importantes en esta revisión").

**No modifiques ningún archivo en ningún paso de este skill.** Esta skill es de solo lectura/diagnóstico.
