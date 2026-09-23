import { validateConfigForm } from './configFormValidation'

const validValues = {
  availableCards: '1, 1/2, 1/3, 1/6',
  cardType: 'number' as const,
  hintsDelay: 5,
  pauseOnAiPlay: true,
  playerCardsAmount: 1,
  tableCardsAmount: 1,
  targetValue: '2',
  useHints: true,
}

describe('validateConfigForm', () => {
  test('parses a valid mixed deck into game configuration', () => {
    expect(validateConfigForm(validValues)).toEqual({
      config: {
        availableCards: [
          { numerator: 1, denominator: 1 },
          { numerator: 1, denominator: 2 },
          { numerator: 1, denominator: 3 },
          { numerator: 1, denominator: 6 },
        ],
        cardType: 'number',
        hintsDelay: 5,
        pauseOnAiPlay: true,
        playerCardsAmount: 1,
        tableCardsAmount: 1,
        targetValue: { numerator: 2, denominator: 1 },
      },
      success: true,
    })
  })

  test.each([
    [
      'rejects malformed card values',
      { availableCards: '1, nope' },
      'Cada carta debe ser un entero positivo o una fracción a/b',
    ],
    [
      'requires the table card count',
      { tableCardsAmount: undefined },
      'La cantidad de cartas en la mesa es requerida',
    ],
    [
      'requires the player card count',
      { playerCardsAmount: undefined },
      'La cantidad de cartas por jugador es requerida',
    ],
    [
      'requires the hint delay when hints are enabled',
      { hintsDelay: undefined },
      'El tiempo para mostrar pistas es requerido',
    ],
    [
      'rejects an insufficient deck',
      { availableCards: '1, 1/2' },
      'Se necesitan más cartas en el mazo',
    ],
    [
      'rejects an invalid target',
      { targetValue: '0' },
      'El valor de la Escoba debe ser un entero o fracción positiva',
    ],
    [
      'rejects cards equal to or greater than the target',
      { availableCards: '1, 2, 1/2, 1/3' },
      'El mazo no debe contener cartas de valor mayor o igual al de la Escoba',
    ],
  ])('%s', (_description, values, error) => {
    expect(validateConfigForm({ ...validValues, ...values })).toEqual({
      error,
      success: false,
    })
  })

  test('sets the hint delay to zero when hints are disabled', () => {
    expect(
      validateConfigForm({
        ...validValues,
        hintsDelay: undefined,
        useHints: false,
      }),
    ).toMatchObject({
      config: { hintsDelay: 0 },
      success: true,
    })
  })
})
