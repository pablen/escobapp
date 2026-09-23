# Registro de cambios

## `v2.0.0` — 2026-09-22

### Agregado

- Soporte para cartas con fracciones y comparación exacta de valores fraccionarios.
- Nuevo preset `sumar1`, con cartas fraccionarias que suman uno.
- Cobertura de tests con Vitest y provider V8, incluyendo reportes HTML y LCOV.

### Modernizado

- Migración de React 16 y Create React App a React 19 y Vite.
- Actualización de TypeScript, Testing Library, Cypress, ESLint, Prettier, Framer Motion y demás dependencias.
- Migración de los diálogos a Radix UI.
- Migración del gestor de paquetes de npm a pnpm mediante Corepack.
- Migración del service worker de CRA a Vite PWA, conservando la URL `/service-worker.js` para actualizar instalaciones offline existentes.
- CI, hooks de Git y scripts de desarrollo actualizados para Node.js 24 y pnpm.

### Calidad y configuración

- Validación de configuración separada de la UI y normalización de valores inválidos de pistas.
- Configuración, estado de partida y parámetros de URL adaptados para trabajar con valores fraccionarios.
- Umbrales conservadores de cobertura incorporados al CI.
- Verificación automática de los artefactos PWA generados durante el build.
- Documentación de instalación, variables de entorno y comandos actualizada.

## `v1.9.0`

- Se añadió splash screen cuando la app corre en modo PWA en iOS
- Status bar transparente cuando la app corre en modo PWA en iOS

## `v1.8.0`

- Modo Offline: se agregó un Service Worker para persistir la aplicación y permitir usarla incluso sin conectividad a internet.

## `v1.7.0`

- El mazo se ordena ahora usando el algoritmo de Fisher-Yates
- Migración de todo el proyecto a TypeScript
- Se añadieron tests

## `v1.6.0`

- El turno inicial se alterna cada vez que se juega nuevamente (en vez de ser aleatorio).
- Los mensajes relativos a la máquina se muestran ahora del lado de la máquina.

## `v1.5.0`

- Pistas: se puede activar que se resalte una posible jugada si el jugador no realizó ninguna luego de un tiempo configurable.

## `v1.4.0`

- Animaciones!
- El usuario puede elegir no volver a mostrar las reglas del juego al inicio.
- Mejoras de visualización en pantallas de distintos tamaños.

## `v1.3.0`

- Soporte para distintas configuraciones iniciales a través de parámetros de URL.
- Soporte para carga de configuraciones iniciales externas.
- Se muestra un cuadro con las reglas del juego al iniciar la aplicación.
- El cuadro de configuración es ahora una ventana modal.

## `v1.2.0`

- Se muestra el detalle de la jugada en el turno de la máquina.
- Pausar al mostrar la jugada de la máquina (se puede desactivar en la configuración).

## `v1.1.0`

- Soporte para presets de configuración.

## `v1.0.0`

- Versión inicial.
