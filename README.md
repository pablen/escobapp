# Escobapp

![Node.js CI](https://github.com/pablen/escobapp/workflows/Node.js%20CI/badge.svg?branch=master)

Juego de cartas para trabajar Matemática en el aula. La meta es juntar cartas
de la mesa con una carta propia hasta alcanzar un valor objetivo configurable.
Se puede jugar con enteros positivos o con fracciones positivas.

## Cómo se juega

En cada turno, elegí una carta propia y las cartas de la mesa que, juntas,
sumen el objetivo. Si no hay una jugada posible, descartá una carta. Levantar
todas las cartas de la mesa suma una escoba. Al terminar, cada escoba vale un
punto y quien reunió más cartas gana otro punto.

Las reglas aparecen al abrir la aplicación. Desde el botón de configuración
se puede elegir un preset o armar una partida a medida.

## Configuración y presets

Se pueden cambiar el valor objetivo, el mazo, la cantidad inicial de cartas en
mesa y por jugador, el diseño de las cartas, la pausa durante el turno de la
máquina y las pistas.

Los presets incluidos son **Sumar 10**, **Sumar 15**, **Sumar 100** y
**Sumar 1**. El último usa un mazo de fracciones.

El valor objetivo y las cartas del mazo aceptan enteros y fracciones positivas
como `1/2`, `2/3` y `3/4`; se pueden mezclar en el mismo mazo. Una carta
conserva la forma en que fue escrita: `2/4` se muestra como `2/4`, aunque para
las reglas equivale a `1/2`.

## Configuración por URL

Se puede compartir una configuración inicial mediante `preset`, `targetValue`,
`availableCards`, `playerCardsAmount`, `tableCardsAmount`, `cardType`,
`pauseOnAiPlay` y `hintsDelay`.

Las fracciones aceptan `/` o `|`; para compartir enlaces se recomienda `|`:

```
?preset=sumar1
?targetValue=1&availableCards=1|2,1|3,1|6&playerCardsAmount=3&tableCardsAmount=4&cardType=number
```

## Modo offline

La aplicación es una PWA. Después de visitarla, puede usarse sin conexión. Si
hay una versión nueva, pide confirmación antes de actualizarla.

## Desarrollo

El proyecto requiere Node.js 24 (ver `.node-version`), Corepack y pnpm.

```
fnm use
corepack enable
pnpm install --frozen-lockfile
pnpm start
```

El servidor de desarrollo queda disponible en `http://127.0.0.1:3000`.

### Verificación

```
pnpm run build
pnpm run verify:pwa
pnpm test
pnpm run test:coverage
pnpm run test:e2e
pnpm exec eslint src cypress --max-warnings=0
```

Para abrir Cypress de forma interactiva, iniciá la aplicación en otra terminal
y ejecutá `pnpm run cypress`.

## Stack

React 19, TypeScript, Vite, Vite PWA/Workbox, pnpm, Vitest, Cypress, Radix UI
y Framer Motion. El CI verifica dependencias, build, PWA, cobertura y pruebas
de punta a punta.

## Variables de entorno

Vite expone al navegador únicamente variables que comienzan con `VITE_`.
`VITE_DEBUG=true` muestra la configuración inicial en la consola durante el
desarrollo. No incluir secretos en variables `VITE_*`.

## Documentación y licencia

- [Registro de cambios](CHANGELOG.md)
- [MIT](LICENSE)
