import { render } from '@testing-library/react'
import React from 'react'

import ScoreBoard from './ScoreBoard'

test('shows points from captured cards, sweeps and totals', () => {
  const { getByTestId } = render(
    <ScoreBoard
      playerStackLength={8}
      aiStackLength={6}
      playerSweeps={2}
      aiSweeps={1}
      playerPoints={3}
      aiPoints={1}
    />
  )

  expect(getByTestId('playerPointsByCards')).toHaveTextContent('1')
  expect(getByTestId('aiPointsByCards')).toHaveTextContent('0')
  expect(getByTestId('playerPointsBySweeps')).toHaveTextContent('2')
  expect(getByTestId('aiPointsBySweeps')).toHaveTextContent('1')
  expect(getByTestId('playerPointsTotal')).toHaveTextContent('3')
  expect(getByTestId('aiPointsTotal')).toHaveTextContent('1')
})
