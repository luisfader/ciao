# Ciao, amore! 2 — sitio web

Sitio web del manual de italiano **Ciao, amore! 2** de Roberto Fader (nivel intermedio).

- **Portada** con el recorrido de las 10 unidades (estilo Duolingo) y el progreso del alumno.
- **Página de cada unidad**: las páginas del manual por sección (A, B, C…), con zoom, y un *Ripasso lampo* de la gramática.
- **Test por unidad** estilo Duolingo, sin audio: elección múltiple, verdadero/falso, emparejar, ordenar palabras, ordenar pasos y escribir la respuesta. 5 corazones, los errores vuelven al final, XP, estrellas y racha de días.
- **Examen final**: 25 ejercicios de todo el manual (2 por unidad + 5 de repaso general), aprobado con 80 %, desglose por unidad y diploma imprimible.
- **Apéndice**: sobre el autor, actividad de personajes y soluciones.

El progreso se guarda en el navegador del alumno (localStorage); no hace falta registro.

## Estructura

```
index.html         portada y recorrido
unit.html?u=N      unidad N (1–10) · unit.html?u=appendice
quiz.html?u=N      test de la unidad N · quiz.html?u=finale
js/data.js         unidades, secciones, páginas y resúmenes de gramática
js/quizzes.js      preguntas de los tests (editables)
js/quiz.js         motor del test
assets/pages/      páginas del manual (webp)
assets/covers/     portadas de las unidades
```

## Editar preguntas

Las preguntas están en `js/quizzes.js`, una lista por unidad. Tipos disponibles:

```js
{ t: 'choice', q: 'Consigna', s: 'Frase con ___', o: ['correcta', 'otra', 'otra'], a: 0 }
{ t: 'tf', ctx: 'Texto', s: 'Afirmación', a: true }
{ t: 'type', q: 'Consigna', s: 'Frase con ___', a: ['respuesta', 'alternativa'] }
{ t: 'build', q: 'Riordina la frase', a: 'Frase correcta', alt: ['otro orden válido'], extra: ['distractor'] }
{ t: 'order', q: 'Consigna', a: ['paso 1', 'paso 2', 'paso 3'] }
{ t: 'match', q: 'Consigna', pairs: [['izquierda', 'derecha'], ...] }
```

Las opciones se barajan solas, así que la respuesta correcta puede ir siempre en la posición `a: 0`. Se puede añadir `tip: '...'` para mostrar una explicación tras responder.

## Publicar

Es un sitio estático sin compilación: basta con GitHub Pages (Settings → Pages → rama `main`, carpeta raíz). Para probarlo en local:

```
python3 -m http.server
```

y abrir http://localhost:8000.
