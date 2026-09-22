import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import presets from './presets'
import Game from './Game'

function fakeShuffle<T>(v: T): T {
  return v
}

test('Shows Rules dialog on startup if enabled', async () => {
  const { getByText } = render(
    <Game
      initialIsPlayerTurn
      initialConfig={presets.del10.options}
      showRules
      shuffle={fakeShuffle}
    />
  )
  expect(getByText('Reglas del juego')).toBeInTheDocument()
})

test('Hides Rules dialog on startup if disabled', async () => {
  const { queryByText } = render(
    <Game
      initialIsPlayerTurn
      initialConfig={presets.del10.options}
      showRules={false}
      shuffle={fakeShuffle}
    />
  )
  expect(queryByText('Reglas del juego')).not.toBeInTheDocument()
})

test('opens and closes the configuration dialog', () => {
  const { getByTitle, getByText, getByRole, queryByRole } = render(
    <Game
      initialIsPlayerTurn
      initialConfig={presets.del10.options}
      showRules={false}
      shuffle={fakeShuffle}
    />
  )

  fireEvent.click(getByTitle('Configuración'))
  expect(getByRole('heading', { name: 'Configuración' })).toBeInTheDocument()

  fireEvent.click(getByText('Cancelar'))
  expect(
    queryByRole('heading', { name: 'Configuración' })
  ).not.toBeInTheDocument()
})

test('allows a selected player card to be discarded', () => {
  const { getByTestId, getByText } = render(
    <Game
      initialIsPlayerTurn
      initialConfig={presets.del10.options}
      showRules={false}
      shuffle={fakeShuffle}
    />
  )

  fireEvent.click(getByTestId('card-0'))
  fireEvent.click(getByText('Descartar'))

  expect(getByText('Esperando a que juegue la máquina...')).toBeInTheDocument()
})

test('allows a player to collect table cards that reach the target', () => {
  const config = {
    ...presets.del10.options,
    availableCards: [1, 2, 9],
    targetValue: 10,
    playerCardsAmount: 1,
    tableCardsAmount: 1,
    hintsDelay: 0,
  }
  const { getByTestId, getByText } = render(
    <Game
      initialIsPlayerTurn
      initialConfig={config}
      showRules={false}
      shuffle={fakeShuffle}
    />
  )

  fireEvent.click(getByTestId('card-0'))
  fireEvent.click(getByTestId('card-2'))
  fireEvent.click(getByText('Jugar'))

  expect(getByText('Esperando a que juegue la máquina...')).toBeInTheDocument()
})
