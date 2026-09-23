import combinations from 'combinations'
import { compare, equals, FractionInput, subtract, sum } from './fractions'

/** The card index in shuffledStack. It serves the purpose of a card ID. */
export type CardIndex = number

export function getRandomTurn(): boolean {
  return Math.random() >= 0.5
}

/**
 * Retorna un array de índices de cartas para realizar la mejor jugada posible.
 * - Si length === 1: no se pueden robar cartas y el índice corresponde a la carta a descartar
 * - Si length > 1, el primer elemento es el índice de la carta a jugar
 *   y el resto son los índices de las cartas de la mesa que forman parte de la jugada
 */
export function getBestPlay(
  playerCards: CardIndex[],
  tableCards: CardIndex[],
  stack: FractionInput[],
  targetValue: FractionInput,
): CardIndex[] {
  const sortedCombinations = combinations(tableCards).sort(
    (a, b) => b.length - a.length,
  )

  for (let i = 0; i < sortedCombinations.length; i++) {
    const requiredCardValue = subtract(
      targetValue,
      sum(sortedCombinations[i].map((index) => stack[index])),
    )

    const requiredCard = playerCards.find((stackIndex) =>
      equals(stack[stackIndex], requiredCardValue),
    )

    if (requiredCard !== undefined) {
      return [requiredCard, ...sortedCombinations[i]]
    }
  }
  // If there are no possible combinations, discard the card with greater value
  return [
    playerCards.find(
      (stackIndex) =>
        compare(stack[stackIndex], stack[playerCards[0]]) >= 0 &&
        playerCards.every(
          (candidate) => compare(stack[stackIndex], stack[candidate]) >= 0,
        ),
    ) as number,
  ]
}
