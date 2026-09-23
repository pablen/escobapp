import { CardType, ConfigOptions } from '../presets'
import { compare, parseFraction } from '../fractions'

export type ConfigFormValues = {
  availableCards: string
  cardType: CardType
  hintsDelay?: number
  pauseOnAiPlay: boolean
  playerCardsAmount?: number
  tableCardsAmount?: number
  targetValue: string
  useHints: boolean
}

type ValidationResult =
  { config: ConfigOptions; success: true } | { error: string; success: false }

export function validateConfigForm(values: ConfigFormValues): ValidationResult {
  const parsedValues = values.availableCards
    .split(',')
    .map((value) => parseFraction(value))
  const availableCards = parsedValues.filter(
    (value): value is NonNullable<typeof value> => value !== null,
  )

  if (availableCards.length !== parsedValues.length) {
    return {
      error: 'Cada carta debe ser un entero positivo o una fracción a/b',
      success: false,
    }
  }
  if (values.tableCardsAmount === undefined) {
    return {
      error: 'La cantidad de cartas en la mesa es requerida',
      success: false,
    }
  }
  if (values.playerCardsAmount === undefined) {
    return {
      error: 'La cantidad de cartas por jugador es requerida',
      success: false,
    }
  }

  const hintsDelay = values.useHints ? values.hintsDelay : 0
  if (hintsDelay === undefined) {
    return {
      error: 'El tiempo para mostrar pistas es requerido',
      success: false,
    }
  }
  if (
    values.tableCardsAmount + 2 * values.playerCardsAmount >
    availableCards.length
  ) {
    return { error: 'Se necesitan más cartas en el mazo', success: false }
  }

  const targetValue = parseFraction(values.targetValue)
  if (!targetValue) {
    return {
      error: 'El valor de la Escoba debe ser un entero o fracción positiva',
      success: false,
    }
  }
  if (availableCards.some((value) => compare(value, targetValue) >= 0)) {
    return {
      error:
        'El mazo no debe contener cartas de valor mayor o igual al de la Escoba',
      success: false,
    }
  }

  return {
    config: {
      availableCards,
      cardType: values.cardType,
      hintsDelay,
      pauseOnAiPlay: values.pauseOnAiPlay,
      playerCardsAmount: values.playerCardsAmount,
      tableCardsAmount: values.tableCardsAmount,
      targetValue,
    },
    success: true,
  }
}
