import * as utils from './utils'

test('Function getRandomTurn returns a random boolean value', async () => {
  expect(typeof utils.getRandomTurn()).toEqual('boolean')
})

describe('Function getBestPlay', () => {
  test('returns the player card with greatest value if no possible play', async () => {
    const targetValue = 10
    const playerCards = [1, 2, 3]
    const tableCards = [5]
    const stack = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(
      utils.getBestPlay(playerCards, tableCards, stack, targetValue)
    ).toEqual([3])
  })

  test('returns the player card with greatest value if empty table', async () => {
    const targetValue = 10
    const playerCards = [1, 2, 3, 5]
    const tableCards: utils.CardIndex[] = []
    const stack = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(
      utils.getBestPlay(playerCards, tableCards, stack, targetValue)
    ).toEqual([5])
  })

  test('returns the best possible play if available', async () => {
    const targetValue = 10
    const playerCards = [8, 4]
    const tableCards = [1, 2, 3]
    const stack = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(
      utils.getBestPlay(playerCards, tableCards, stack, targetValue)
    ).toEqual([4, 1, 2, 3])
  })

  test('matches equivalent fractions and discards the greatest fraction', () => {
    const stack = [
      { numerator: 2, denominator: 4 },
      { numerator: 1, denominator: 3 },
      { numerator: 1, denominator: 2 },
      { numerator: 1, denominator: 6 },
      { numerator: 3, denominator: 4 },
    ]

    expect(
      utils.getBestPlay([0, 4], [1, 3], stack, { numerator: 1, denominator: 1 })
    ).toEqual([0, 1, 3])
    expect(
      utils.getBestPlay([0, 4], [], stack, { numerator: 1, denominator: 1 })
    ).toEqual([4])
  })
})
