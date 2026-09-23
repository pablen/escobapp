import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import presets from '../presets'
import RulesDialog from './RulesDialog'

afterEach(() => window.localStorage.clear())

test('explains the configured target and starts the game', () => {
  const onClose = vi.fn()
  const { getByText } = render(
    <RulesDialog currentConfig={presets.del15.options} onClose={onClose} />,
  )

  expect(getByText('15')).toBeInTheDocument()
  fireEvent.click(getByText('¡EMPEZAR!'))

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('persists the preference to hide rules after starting', () => {
  const onClose = vi.fn()
  const { baseElement, getByText } = render(
    <RulesDialog currentConfig={presets.del10.options} onClose={onClose} />,
  )

  fireEvent.click(
    baseElement.querySelector('input[type="checkbox"]') as Element,
  )
  fireEvent.click(getByText('¡EMPEZAR!'))

  expect(window.localStorage.getItem('showRules')).toBe('false')
})
