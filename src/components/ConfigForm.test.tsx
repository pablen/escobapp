import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import presets from '../presets'
import ConfigForm from './ConfigForm'

function renderForm() {
  const onClose = jest.fn()
  const onSubmit = jest.fn()
  const result = render(
    <ConfigForm
      currentConfig={presets.del10.options}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  )

  return { ...result, onClose, onSubmit }
}

test('loads a preset and submits its options', () => {
  const { baseElement, onClose, onSubmit } = renderForm()

  fireEvent.click(
    baseElement.querySelector('[data-preset-id="del100"]') as Element
  )
  fireEvent.submit(baseElement.querySelector('form') as HTMLFormElement)

  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith(presets.del100.options)
})

test('reports an insufficient deck instead of submitting', () => {
  const { baseElement, getByLabelText, onClose, onSubmit } = renderForm()

  fireEvent.change(getByLabelText('Cartas del mazo'), {
    target: { value: '1, 2, 3' },
  })
  fireEvent.submit(baseElement.querySelector('form') as HTMLFormElement)

  expect(getByLabelText('Cartas del mazo')).toBeInTheDocument()
  expect(baseElement).toHaveTextContent('Se necesitan más cartas en el mazo')
  expect(onClose).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows selecting the numeric design and disabling hints', () => {
  const { baseElement, getByText, onSubmit } = renderForm()

  fireEvent.click(baseElement.querySelector('#cardType-number') as Element)
  fireEvent.click(getByText(/Mostrar pistas a los/))
  fireEvent.submit(baseElement.querySelector('form') as HTMLFormElement)

  expect(onSubmit).toHaveBeenCalledWith({
    ...presets.del10.options,
    cardType: 'number',
    hintsDelay: 0,
  })
})

test('closes without submitting when cancelled', () => {
  const { getByText, onClose, onSubmit } = renderForm()

  fireEvent.click(getByText('Cancelar'))

  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('accepts mixed integer and fraction card values', () => {
  const { baseElement, getByLabelText, onSubmit } = renderForm()

  fireEvent.change(getByLabelText('Escoba del'), { target: { value: '2' } })
  fireEvent.change(getByLabelText('Cantidad de cartas por jugador'), {
    target: { value: '1', valueAsNumber: 1 },
  })
  fireEvent.change(getByLabelText('Cantidad de cartas en la mesa'), {
    target: { value: '1', valueAsNumber: 1 },
  })
  fireEvent.change(getByLabelText('Cartas del mazo'), {
    target: { value: '1, 1/2, 2/4, 1|3' },
  })
  fireEvent.submit(baseElement.querySelector('form') as HTMLFormElement)

  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      targetValue: { numerator: 2, denominator: 1 },
      availableCards: [
        { numerator: 1, denominator: 1 },
        { numerator: 1, denominator: 2 },
        { numerator: 2, denominator: 4 },
        { numerator: 1, denominator: 3 },
      ],
    })
  )
})
