---
name: publicar-feature
description: Revisa, confirma y publica una feature Git en la rama actual — verifica el diff, detecta archivos sospechosos, propone un commit descriptivo y espera autorización antes de ejecutar add, commit y push.
---

# /publicar-feature

Revisa, prepara y publica la feature de la rama actual en GitHub.
Sigue estos pasos en orden y espera autorización antes de modificar el repositorio.

## Paso 1 — Estado Git

Ejecuta en paralelo:
- `git branch --show-current` — muestra la rama activa.
- `git status` — lista archivos modificados, añadidos o sin seguimiento.
- `git diff HEAD` — muestra el diff completo de los cambios.

Presenta la rama actual y un resumen de los archivos afectados.

## Paso 2 — Análisis de seguridad y coherencia

Revisa el diff y detecta:
- Archivos sospechosos: `.env`, archivos con claves, tokens, contraseñas o datos sensibles.
- Archivos no relacionados con la feature (configuración global, otros módulos, archivos generados).
- Binarios inesperados o archivos de sistema (`.DS_Store`, `node_modules/`, etc.).

Si detectas cualquier problema, adviértelo claramente antes de continuar.

## Paso 3 — Propuesta

Presenta al usuario:
1. El mensaje de commit propuesto en inglés (título conciso + cuerpo breve si aplica).
2. La lista exacta de archivos que se incluirán en el staging.
3. Las tres operaciones Git que se ejecutarán: `git add`, `git commit`, `git push`.

## Paso 4 — Autorización obligatoria

**Detente aquí.** No ejecutes ningún comando que modifique el repositorio hasta recibir confirmación explícita del usuario.

## Paso 5 — Ejecución (solo tras autorización)

1. `git add <archivos-listados>` — nunca usar `git add .` ni `git add -A`.
2. `git commit` con el mensaje propuesto, usando HEREDOC para respetar el formato.
3. `git push -u origin <rama-actual>`.

## Paso 6 — Verificación

Ejecuta `git status` y confirma que el árbol está limpio y la rama sincronizada con `origin`.

Informa el resultado final y, si GitHub proporciona una URL para crear el Pull Request después del push, muéstramela.
