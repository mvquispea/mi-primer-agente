---
name: publicar-feature
description: Revisa, confirma y publica una feature Git en la rama actual — verifica el diff, detecta archivos sospechosos, propone un commit descriptivo y espera autorización antes de ejecutar add, commit y push.
---

# /publicar-feature

Revisa, prepara y publica la feature de la rama actual en GitHub.
Sigue estos pasos en orden y espera autorización antes de modificar el repositorio.

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

## Paso 3 — Análisis de seguridad y coherencia

Revisa las fuentes del Paso 2 y detecta:
- Archivos sospechosos: `.env`, archivos con claves, tokens, contraseñas o datos sensibles.
- Archivos no relacionados con la feature (configuración global, otros módulos, archivos generados).
- Binarios inesperados o archivos de sistema (`.DS_Store`, `node_modules/`, etc.).

Si detectas cualquier problema, adviértelo claramente antes de continuar.

## Paso 4 — Propuesta

Presenta al usuario:
1. El mensaje de commit propuesto en inglés (título conciso + cuerpo breve si aplica).
2. La lista exacta de archivos que se incluirán en el staging.
3. Las tres operaciones Git que se ejecutarán: `git add`, `git commit`, `git push`.

## Paso 5 — Autorización obligatoria

**Detente aquí.** No ejecutes ningún comando que modifique el repositorio hasta recibir confirmación explícita del usuario.

## Paso 6 — Ejecución (solo tras autorización)

1. `git add <archivos-listados>` — nunca usar `git add .` ni `git add -A`.
2. `git commit` con el mensaje propuesto, usando HEREDOC para respetar el formato.
3. `git push -u origin <rama-actual>`.

## Paso 7 — Verificación

Ejecuta `git status` y confirma que el árbol está limpio y la rama sincronizada con `origin`.

Informa el resultado final y, si GitHub proporciona una URL para crear el Pull Request después del push, muéstramela.
