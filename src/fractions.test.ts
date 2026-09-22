import {
  add,
  compare,
  equals,
  format,
  isInteger,
  parseFraction,
  subtract,
  sum,
} from './fractions'

const fraction = (value: string | number) => {
  const parsed = parseFraction(value)
  if (!parsed) throw new Error(`Expected ${value} to be valid`)
  return parsed
}

describe('fractions', () => {
  test('parses integers and both supported fraction separators', () => {
    expect(parseFraction('2/4')).toEqual({ numerator: 2, denominator: 4 })
    expect(parseFraction('1|3')).toEqual({ numerator: 1, denominator: 3 })
    expect(parseFraction(5)).toEqual({ numerator: 5, denominator: 1 })
  })

  test('rejects unsafe, non-positive and malformed values', () => {
    expect(parseFraction('0')).toBeNull()
    expect(parseFraction('-1/2')).toBeNull()
    expect(parseFraction('1/0')).toBeNull()
    expect(parseFraction('5 1/3')).toBeNull()
  })

  test('calculates and compares rational values exactly', () => {
    expect(add(fraction('1/2'), fraction('1/3'))).toEqual({
      numerator: 5,
      denominator: 6,
    })
    expect(subtract(fraction(1), fraction('1/3'))).toEqual({
      numerator: 2,
      denominator: 3,
    })
    expect(sum([fraction('1/2'), fraction('1/3'), fraction('1/6')])).toEqual({
      numerator: 1,
      denominator: 1,
    })
    expect(equals(fraction('2/4'), fraction('1/2'))).toBe(true)
    expect(compare(fraction('3/4'), fraction('2/3'))).toBeGreaterThan(0)
  })

  test('formats display values without simplifying them', () => {
    expect(format(fraction('2/4'))).toBe('2/4')
    expect(format(fraction(1))).toBe('1')
    expect(isInteger(fraction(1))).toBe(true)
  })
})
