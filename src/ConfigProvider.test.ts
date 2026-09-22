import presets from './presets'
import { getLocalConfig } from './ConfigProvider'

describe('getLocalConfig', () => {
  test('uses the requested preset as the base configuration', () => {
    expect(getLocalConfig({ preset: 'del15' })).toEqual(presets.del15.options)
  })

  test('uses the default preset when the requested preset is invalid', () => {
    expect(getLocalConfig({ preset: 'unknown' as 'del10' })).toEqual(
      presets.del10.options
    )
  })

  test('accepts valid local overrides', () => {
    expect(
      getLocalConfig({
        preset: 'del100',
        targetValue: 50,
        playerCardsAmount: 2,
        tableCardsAmount: 1,
        availableCards: [10, 20, 30, 40, 10],
        cardType: 'number',
        pauseOnAiPlay: false,
        hintsDelay: 0,
      })
    ).toEqual({
      targetValue: { numerator: 50, denominator: 1 },
      playerCardsAmount: 2,
      tableCardsAmount: 1,
      availableCards: [10, 20, 30, 40, 10].map((numerator) => ({
        numerator,
        denominator: 1,
      })),
      cardType: 'number',
      pauseOnAiPlay: false,
      hintsDelay: 0,
    })
  })

  test('ignores invalid target, card counts and deck entries', () => {
    expect(
      getLocalConfig({
        targetValue: 0,
        playerCardsAmount: 0,
        tableCardsAmount: -1,
        availableCards: [0, -1, 10],
      })
    ).toEqual(presets.del10.options)
  })

  test('keeps numeric hint delays, including values supplied directly by URL', () => {
    expect(getLocalConfig({ hintsDelay: -1 }).hintsDelay).toBe(-1)
  })

  test('falls back to the base card counts when an override deck is too small', () => {
    const config = getLocalConfig({
      playerCardsAmount: 2,
      tableCardsAmount: 1,
      availableCards: [1, 2, 3],
    })

    expect(config.playerCardsAmount).toBe(
      presets.del10.options.playerCardsAmount
    )
    expect(config.tableCardsAmount).toBe(presets.del10.options.tableCardsAmount)
    expect(config.availableCards).toEqual(presets.del10.options.availableCards)
  })

  test('keeps valid card counts when the deck has enough cards', () => {
    const config = getLocalConfig({
      playerCardsAmount: 1,
      tableCardsAmount: 1,
      availableCards: [1, 2, 3],
    })

    expect(config.playerCardsAmount).toBe(1)
    expect(config.tableCardsAmount).toBe(1)
    expect(config.availableCards).toEqual(
      [1, 2, 3].map((numerator) => ({
        numerator,
        denominator: 1,
      }))
    )
  })

  test('accepts fractions from URL parameters with either separator', () => {
    const config = getLocalConfig({
      targetValue: '1',
      playerCardsAmount: 1,
      tableCardsAmount: 1,
      availableCards: ['1|2', '1/3', '1/6', '2/4'],
    })

    expect(config.targetValue).toEqual({ numerator: 1, denominator: 1 })
    expect(config.availableCards).toEqual([
      { numerator: 1, denominator: 2 },
      { numerator: 1, denominator: 3 },
      { numerator: 1, denominator: 6 },
      { numerator: 2, denominator: 4 },
    ])
  })
})
