# Plan: soporte de fracciones

## Objetivo

Extender Escobapp para usar cartas fraccionarias, sin perder el soporte actual
para enteros. El juego debe poder sumar valores racionales de forma exacta,
mostrar fracciones con notacion matematica en las cartas, configurar mazos y
objetivos manualmente, y ofrecer el preset publico `sumar1`.

El preset es solo un punto de partida: el motor debe admitir mazos mixtos de
enteros y fracciones, con objetivos enteros o fraccionarios.

## Alcance funcional

- Se aceptan enteros positivos y fracciones positivas como `1/2`, `2/3` o
  `3/4`.
- No se aceptan valores negativos, cero, denominador cero ni numeros mixtos
  como `5 1/3`.
- Una carta ingresada como `2/4` debe mostrarse como `2/4`; no se simplifica
  visualmente a `1/2`.
- Aun asi, `2/4` y `1/2` son equivalentes para las reglas, los hints y la IA.
- En la configuracion se conservan solamente los tipos de carta `image` y
  `number`.
  - Los enteros usan dibujos o numero segun la opcion configurada.
  - Las fracciones siempre usan el diseno de fraccion.
- Los mensajes de jugadas de la IA se muestran como texto plano, por ejemplo:
  `La maquina juega 1/2 + 1/3 + 1/6 = 1`.

## Modelo matematico

Crear `src/fractions.ts` con operaciones racionales exactas y sin agregar una
dependencia externa.

La carta conserva su forma de presentacion:

```ts
type FractionValue = {
  numerator: number
  denominator: number
}
```

Los enteros se representan como denominador `1`. Al ingresar `2/4`, se
conservan `numerator: 2` y `denominator: 4` para renderizar la carta. Las
operaciones, en cambio, trabajan con una representacion reducida temporal para
evitar errores de punto flotante.

El modulo debe proveer, como minimo:

- `parseFraction(value)`: acepta enteros, `a/b` y `a|b`.
- `add(a, b)` y `subtract(a, b)`.
- `compare(a, b)` y `equals(a, b)`.
- `sum(values)`.
- `isInteger(value)`.
- `format(value)`: muestra enteros como `1` y fracciones como `a/b`.
- funciones de validacion y reduccion por maximo comun divisor para calculos.

Las comparaciones se hacen por producto cruzado; nunca por conversion a
decimales ni por igualdad de objetos.

## Configuracion y estado

Actualizar `ConfigOptions`, el estado y los props para que `availableCards` y
`targetValue` usen `FractionValue`.

Las configuraciones existentes que usan numeros deben mantenerse compatibles:
un numero se convierte a una fraccion con denominador `1` al cargarlo.

Validaciones generales:

- objetivo positivo;
- cada carta positiva;
- cada carta estrictamente menor que el objetivo, usando comparacion racional;
- cantidad suficiente de cartas para el reparto inicial;
- numeradores y denominadores enteros seguros.

Esto permite configuraciones mixtas como:

```text
Mazo: 1, 1/2, 2/3, 3/4, 2
Objetivo: 2
```

## Reglas, hints e IA

Reemplazar toda suma, resta, igualdad y orden numerico basada en `number` por
las utilidades racionales.

Para validar una jugada, sumar exactamente la carta del jugador y las cartas
seleccionadas de la mesa, y comparar el resultado con el objetivo.

La estrategia actual de hints y de la IA se conserva:

1. Generar combinaciones de cartas de la mesa, priorizando las mas largas.
2. Sumar exactamente cada combinacion.
3. Calcular el valor faltante hasta el objetivo.
4. Buscar en la mano una carta racionalmente equivalente.
5. Si no hay jugada, descartar la carta de mayor valor usando comparacion
   racional.

Por ejemplo, una carta `2/4` debe poder completar una jugada que necesita
`1/2`.

Los mensajes deben formatear las cartas y el objetivo con `format`, sin LaTeX
ni renderizadores matematicos adicionales.

## Render de cartas

Mantener las dos opciones visibles existentes:

- `image`: los enteros soportados usan dibujos.
- `number`: los enteros se muestran como numeros grandes.

Cuando `denominator !== 1`, el componente de carta debe seleccionar
automaticamente un SVG de fraccion. El SVG contiene dos elementos `<text>` y
una linea horizontal `<line>` entre ambos.

Una carta entera se muestra como `1`, no como `1/1`.

## Configuracion manual

Cambiar los campos que hoy esperan numeros para aceptar texto con enteros o
fracciones.

Ejemplos validos para el mazo:

```text
1, 1/2, 2/4, 1|3
```

El objetivo tambien puede ser entero o fraccionario. El formulario debe
informar claramente cada valor invalido antes de iniciar una partida.

## Parametros por URL

Mantener el preset como parametro publico:

```text
?preset=sumar1
```

Aceptar ambos separadores para las fracciones en parametros de URL:

```text
?targetValue=1&availableCards=1|2,1|3,1|6
```

```text
?targetValue=1&availableCards=1/2,1/3,1/6
```

El formato con `|` es el recomendado para compartir URLs manualmente. El
parser admite ambos para no imponer una unica forma de codificacion.

## Preset `sumar1`

Agregar el preset publico `sumar1` con estas opciones:

```text
Objetivo: 1
Cartas por jugador: 3
Cartas iniciales en mesa: 4
Tipo de carta: number
```

Primera propuesta de mazo, con 28 cartas:

```text
1/2, 1/2,
2/4, 2/4,
1/3, 1/3, 1/3,
2/3, 2/3, 2/3,
1/4, 1/4, 1/4,
3/4, 3/4, 3/4,
1/5, 1/5,
2/5, 2/5,
3/5, 3/5,
4/5, 4/5,
1/6, 1/6,
5/6, 5/6
```

El mazo se considera una primera version pedagogica y debe ser sencillo de
iterar en futuras configuraciones.

## Plan de implementacion

1. Implementar `fractions.ts` y sus tests unitarios.
2. Migrar los tipos de configuracion, estado y props.
3. Adaptar validacion de configuracion y de jugadas.
4. Adaptar hints, IA, descarte y mensajes.
5. Incorporar el preset `sumar1`.
6. Adaptar formulario y parseo de URL.
7. Incorporar el SVG para cartas fraccionarias.
8. Actualizar reglas y mensajes visibles donde se formatea el objetivo.
9. Agregar tests de render, store, URL y Cypress.
10. Ejecutar la suite completa y verificar regresion de `del10`, `del15` y
    `del100`.

## Criterios de aceptacion

- Una partida con `preset=sumar1` inicia y permite sumar fracciones hasta `1`.
- Una configuracion manual acepta enteros, fracciones y mazos mixtos.
- `2/4` se ve como `2/4`, pero es valido donde se requiere `1/2`.
- Hints e IA encuentran jugadas con denominadores distintos.
- La IA descarta correctamente la fraccion de mayor valor cuando no hay
  jugada.
- Las URLs aceptan fracciones con `/` y `|`.
- Los presets de enteros existentes mantienen su comportamiento actual.
