export type FractionValue = {
  numerator: number
  denominator: number
}

export type FractionInput = FractionValue | number

function isSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value)
}

export function gcd(a: number, b: number): number {
  let left = Math.abs(a)
  let right = Math.abs(b)
  while (right !== 0) {
    const remainder = left % right
    left = right
    right = remainder
  }
  return left
}

export function reduce(value: FractionInput): FractionValue {
  const fraction = toFraction(value)
  const divisor = gcd(fraction.numerator, fraction.denominator)
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  }
}

export function toFraction(value: FractionInput): FractionValue {
  return typeof value === 'number'
    ? { numerator: value, denominator: 1 }
    : value
}

export function isValidFraction(value: unknown): value is FractionValue {
  if (!value || typeof value !== 'object') return false
  const fraction = value as FractionValue
  return (
    isSafeInteger(fraction.numerator) &&
    isSafeInteger(fraction.denominator) &&
    fraction.numerator > 0 &&
    fraction.denominator > 0
  )
}

export function isValidFractionInput(value: unknown): value is FractionInput {
  return typeof value === 'number'
    ? isSafeInteger(value) && value > 0
    : isValidFraction(value)
}

export function parseFraction(value: unknown): FractionValue | null {
  if (typeof value === 'number') {
    return isSafeInteger(value) && value > 0
      ? { numerator: value, denominator: 1 }
      : null
  }
  if (typeof value !== 'string') return null
  const match = value.trim().match(/^(\d+)(?:[\\/|](\d+))?$/)
  if (!match) return null
  const fraction = {
    numerator: Number(match[1]),
    denominator: match[2] ? Number(match[2]) : 1,
  }
  return isValidFraction(fraction) ? fraction : null
}

export function add(a: FractionInput, b: FractionInput): FractionValue {
  const left = reduce(a)
  const right = reduce(b)
  return reduce({
    numerator:
      left.numerator * right.denominator + right.numerator * left.denominator,
    denominator: left.denominator * right.denominator,
  })
}

export function subtract(a: FractionInput, b: FractionInput): FractionValue {
  const left = reduce(a)
  const right = reduce(b)
  return reduce({
    numerator:
      left.numerator * right.denominator - right.numerator * left.denominator,
    denominator: left.denominator * right.denominator,
  })
}

export function compare(a: FractionInput, b: FractionInput): number {
  const left = reduce(a)
  const right = reduce(b)
  return left.numerator * right.denominator - right.numerator * left.denominator
}

export function equals(a: FractionInput, b: FractionInput): boolean {
  return compare(a, b) === 0
}

export function sum(values: FractionInput[]): FractionValue {
  return values.reduce<FractionValue>(add, { numerator: 0, denominator: 1 })
}

export function isInteger(value: FractionInput): boolean {
  return reduce(value).denominator === 1
}

export function format(value: FractionInput): string {
  const fraction = toFraction(value)
  return fraction.denominator === 1
    ? String(fraction.numerator)
    : `${fraction.numerator}/${fraction.denominator}`
}
