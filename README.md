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

## Modo Offline

Una vez visitada la aplicación, la misma puede ser utilizada incluso sin conectividad a internet.

## Instalación y correr en modo desarrollo

El proyecto requiere Node.js 16.20.2 (ver `.nvmrc`). Con `nvm`:

```
$ nvm use
```

Instalar las dependencias y levantar la aplicación:

```
$ npm ci
$ npm start
```

## Correr tests unitarios

```
$ npm run test
```

## Correr tests end-to-end

La suite inicia la aplicación y ejecuta Cypress automáticamente:

```
$ npm run test:e2e
```

Para correr Cypress de manera interactiva, primero iniciar la aplicación en otra terminal y verificar que la URL coincida con `baseUrl` en `cypress.json`:

```
$ npm start
$ npm run cypress
```

## LICENCIA

[MIT](LICENSE)
