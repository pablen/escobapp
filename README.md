# Escobapp

![Node.js CI](https://github.com/pablen/escobapp/workflows/Node.js%20CI/badge.svg?branch=master)

Un juego de cartas similar a "Escoba del 15" para usar en ámbitos educativos de Matemática.

El juego es adaptable para distintos usos didácticos y permite configurar los siguientes parámetros.

- Tipo de carta: con figuras y números o sólo números.
- Valor a sumar: por defecto el valor a sumar es 10.
- Cantidad de cartas en la mesa al inicio de la partida.
- Cantidad de cartas por jugador al inicio de la partida.
- Cartas que conforman el mazo: Cuáles valores y qué cantidad de cada uno.
- Pausar cuando juega la máquina o no.
- Tiempo de espera antes de dar una pista de una posible jugada (o desactivar pistas por completo).

### Fracciones

Además de enteros positivos, el valor objetivo y las cartas del mazo pueden ser
fracciones positivas, por ejemplo `1/2`, `2/3` o `3/4`. Se pueden combinar
enteros y fracciones en el mismo mazo. La carta conserva la forma ingresada:
`2/4` se muestra como `2/4`, aunque en el juego equivale a `1/2`.

El preset **Sumar 1** ofrece un mazo inicial de fracciones. También puede
abrirse directamente con `?preset=sumar1`.

Para configurar desde la URL, usar `targetValue` y `availableCards`. Las
fracciones admiten `/` o `|`; se recomienda `|` para compartir enlaces:

```
?targetValue=1&availableCards=1|2,1|3,1|6
```

## Modo Offline

Una vez visitada la aplicación, la misma puede ser utilizada incluso sin conectividad a internet.

## Instalación y correr en modo desarrollo

El proyecto requiere Node.js 24 (ver `.node-version`). Con `fnm`:

```
$ fnm use
```

Instalar las dependencias y levantar la aplicación:

```
$ corepack enable
$ pnpm install --frozen-lockfile
$ pnpm start
```

## Correr tests unitarios

```
$ pnpm test
```

## Correr tests end-to-end

La suite inicia la aplicación y ejecuta Cypress automáticamente:

```
$ pnpm run test:e2e
```

Para correr Cypress de manera interactiva, primero iniciar la aplicación en otra terminal y verificar que la URL coincida con `baseUrl` en `cypress.config.ts`:

```
$ pnpm start
$ pnpm run cypress
```

## Variables de entorno

Vite expone al navegador únicamente variables que comienzan con `VITE_`.
Para configurar una sala de Firebase o habilitar opciones de depuración, usar
`VITE_FIREBASE_PROJECT_NAME` y `VITE_DEBUG` respectivamente.

## LICENCIA

[MIT](LICENSE)
