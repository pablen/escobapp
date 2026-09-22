import { FractionInput, FractionValue, parseFraction } from './fractions'

export type PresetName = 'del10' | 'del15' | 'del100' | 'sumar1'
export type CardType = 'image' | 'number'

export type ConfigOptions = {
  /** Card values included in the game deck */
  availableCards: FractionInput[]

  /** The value that played cards must sum up to */
  targetValue: FractionInput

  /** The amount of cards on the table the game starts with */
  tableCardsAmount: number

  /** The amount of cards each player starts the game with */
  playerCardsAmount: number

  /**
   * The cards design variant.
   * Some variants can be restricted to certain value ranges.
   */
  cardType: CardType

  /** Wether to require the user to manually confirm an AI play */
  pauseOnAiPlay: boolean

  /**
   * The amount of seconds to wait before hinting the best possible play.
   * Use 0 to disable hints.
   */
  hintsDelay: number
}

type Presets = {
  [name in PresetName]: {
    label: string
    options: ConfigOptions
  }
}

const fraction = (value: number | string): FractionValue =>
  parseFraction(value) as FractionValue

const deck = (values: Array<number | string>): FractionValue[] =>
  values.map(fraction)

const presets: Presets = {
  del10: {
    label: 'Sumar 10',
    options: {
      // prettier-ignore
      availableCards: deck([1, 1, 1, 1, 1, 2, 2, 2, 3,
        3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9]),
      targetValue: fraction(10),
      tableCardsAmount: 4,
      playerCardsAmount: 3,
      cardType: 'image',
      pauseOnAiPlay: true,
      hintsDelay: 5,
    },
  },

  del15: {
    label: 'Sumar 15',
    options: {
      // prettier-ignore
      availableCards: deck([1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5,
        5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 11, 12, 13, 14]),
      targetValue: fraction(15),
      tableCardsAmount: 4,
      playerCardsAmount: 3,
      cardType: 'image',
      pauseOnAiPlay: true,
      hintsDelay: 5,
    },
  },

  del100: {
    label: 'Sumar 100',
    options: {
      // prettier-ignore
      availableCards: deck([10, 10, 10, 10, 10, 20, 20, 20, 30,
        30, 30, 40, 40, 50, 50, 60, 60, 70, 70, 80, 80, 90]),
      targetValue: fraction(100),
      tableCardsAmount: 4,
      playerCardsAmount: 3,
      cardType: 'number',
      pauseOnAiPlay: true,
      hintsDelay: 5,
    },
  },

  sumar1: {
    label: 'Sumar 1',
    options: {
      availableCards: deck([
        '1/2',
        '1/2',
        '2/4',
        '2/4',
        '1/3',
        '1/3',
        '1/3',
        '2/3',
        '2/3',
        '2/3',
        '1/4',
        '1/4',
        '1/4',
        '3/4',
        '3/4',
        '3/4',
        '1/5',
        '1/5',
        '2/5',
        '2/5',
        '3/5',
        '3/5',
        '4/5',
        '4/5',
        '1/6',
        '1/6',
        '5/6',
        '5/6',
      ]),
      targetValue: fraction(1),
      tableCardsAmount: 4,
      playerCardsAmount: 3,
      cardType: 'number',
      pauseOnAiPlay: true,
      hintsDelay: 5,
    },
  },
}

export default presets
