import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import Card from './Card'

test('uses the number design for values above the illustrated range', () => {
  const { container } = render(<Card id={1} type="image" value={11} />)

  expect(container.querySelector('[data-cardtype="number"]')).toBeTruthy()
})

test('renders a reversed card without exposing its value', () => {
  const { getByTestId, queryByText } = render(
    <Card id={1} isReversed type="number" value={7} />,
  )

  expect(getByTestId('card-1').querySelector('svg')).toBeTruthy()
  expect(queryByText('7')).not.toBeInTheDocument()
})

test('calls onClick with its card id when interactive', () => {
  const onClick = vi.fn()
  const { getByTestId } = render(
    <Card id={5} onClick={onClick} type="number" value={7} />,
  )

  fireEvent.click(getByTestId('card-5'))

  expect(onClick).toHaveBeenCalledWith(5)
})

test('renders fractions with a numerator, bar and denominator', () => {
  const { container } = render(
    <Card id={1} type="image" value={{ numerator: 2, denominator: 4 }} />,
  )

  expect(container.querySelector('[data-cardtype="fraction"]')).toBeTruthy()
  expect(
    container
      .querySelector('[data-cardtype="fraction"]')
      ?.getAttribute('class'),
  ).toBeTruthy()
  expect(container.querySelectorAll('text')).toHaveLength(2)
  expect(container.querySelector('line')).toBeTruthy()
})
