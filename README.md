# Ciao, amore! 2 — sitio web

Sitio web del manual de italiano **Ciao, amore! 2** de Roberto Fader (nivel intermedio).

- **Portada** con el recorrido de las 10 unidades y el progreso del alumno. Por ahora solo están abiertas las unidades 1 y 2; las demás y el examen final aparecen como «disponibile presto».
- **Lección interactiva por unidad**: textos y diálogos con las ilustraciones del manual y, en la misma página, los ejercicios: arrastrar palabras a los huecos, emparejar arrastrando, escribir, elegir dentro de la frase, verdadero/falso, elección múltiple, clasificar en columnas y escritura libre con ejemplo. Cada ejercicio se corrige al momento y tiene «Mostra la soluzione».
- **Test final de cada unidad** estilo Duolingo, sin audio: 5 corazones, los errores vuelven al final, XP y estrellas.
- **Examen final** (ya programado): se activa cuando todas las unidades tengan `available: true`.

El progreso se guarda en el navegador del alumno (localStorage); no hace falta registro.

## Estructura

```
index.html         portada y recorrido
unit.html?u=N      lección interactiva de la unidad N
quiz.html?u=N      test final de la unidad N · quiz.html?u=finale
js/data.js         unidades, secciones y qué unidades están disponibles
js/lessons.js      contenido y ejercicios de cada lección (editable)
js/exercises.js    motor de los ejercicios en la página
js/quizzes.js      preguntas de los tests finales (editables)
js/quiz.js         motor del test
assets/img/        ilustraciones del manual
assets/covers/     portadas de las unidades
```

## Editar las lecciones

Cada lección está en `js/lessons.js`. Dentro de un ejercicio, `[[respuesta|alternativa]]` crea un hueco (para escribir o arrastrar) y `{{correcta*|incorrecta}}` una elección dentro de la frase. Para abrir una unidad nueva, añade su contenido en `lessons.js` y pon `available: true` en `js/data.js`.

## Editar preguntas del test

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
