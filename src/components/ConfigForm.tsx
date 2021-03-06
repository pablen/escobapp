import React, { useCallback, useState } from 'react'
import { Dialog } from '@reach/dialog'
import PropTypes from 'prop-types'

import { configPropTypes } from '../utils'
import Input, { Label } from './Input'
import Checkbox from './Checkbox'
import presets, { PresetName } from '../presets'
import styles from './ConfigForm.module.css'
import Card from './Card'
import Btn from './Btn'

const ConfigForm: React.FC<Props> = ({ onClose, onSubmit, currentConfig }) => {
  const [message, setMessage] = useState<string | null>(null)

  const [pauseOnAiPlay, setPauseOnAiPlay] = useState(
    currentConfig.pauseOnAiPlay
  )

  const [playerCardsAmount, setPlayerCardsAmount] = useState<
    number | undefined
  >(currentConfig.playerCardsAmount)

  const [tableCardsAmount, setTableCardsAmount] = useState<number | undefined>(
    currentConfig.tableCardsAmount
  )

  const [availableCards, setAvailableCards] = useState(
    currentConfig.availableCards.join(', ')
  )

  const [targetValue, setTargetValue] = useState<number | undefined>(
    currentConfig.targetValue
  )

  const [cardType, setCardType] = useState(currentConfig.cardType)
  const [useHints, setUseHints] = useState(currentConfig.hintsDelay > 0)
  const [hintsDelay, setHintsDelay] = useState(currentConfig.hintsDelay || 5)

  const handleUseHintsToggle = useCallback((newValue) => {
    if (newValue) {
      setHintsDelay(5)
    }
    setUseHints(newValue)
  }, [])

  const handlePreset: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (ev) => {
      if (typeof ev.currentTarget.dataset.presetId !== 'string') return
      const { options } = presets[
        ev.currentTarget.dataset.presetId as PresetName
      ]
      setPlayerCardsAmount(options.playerCardsAmount)
      setTableCardsAmount(options.tableCardsAmount)
      setAvailableCards(options.availableCards.join(', '))
      setPauseOnAiPlay(options.pauseOnAiPlay)
      setTargetValue(options.targetValue)
      setHintsDelay(options.hintsDelay)
      setCardType(options.cardType)
    },
    []
  )

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault()
      const parsedAvailableCards = availableCards
        .split(',')
        .map((v) => parseInt(v, 10))
        .filter((v) => v && v >= 0)
      if (tableCardsAmount === undefined) {
        setMessage('La cantidad de cartas en la mesa es requerida')
        return
      }
      if (playerCardsAmount === undefined) {
        setMessage('La cantidad de cartas por jugador es requerida')
        return
      }
      if (
        tableCardsAmount + 2 * playerCardsAmount >
        parsedAvailableCards.length
      ) {
        setMessage('Se necesitan más cartas en el mazo')
        return
      }
      if (targetValue === undefined) {
        setMessage('El valor de la Escoba es requerido')
        return
      }
      if (parsedAvailableCards.some((v) => v >= targetValue)) {
        setMessage(
          'El mazo no debe contener cartas de valor mayor o igual al de la Escoba'
        )
        return
      }
      setMessage(null)
      onClose()
      onSubmit({
        playerCardsAmount,
        tableCardsAmount,
        availableCards: parsedAvailableCards,
        pauseOnAiPlay,
        targetValue,
        hintsDelay: useHints ? hintsDelay : 0,
        cardType,
      })
    },
    [
      playerCardsAmount,
      tableCardsAmount,
      availableCards,
      pauseOnAiPlay,
      targetValue,
      hintsDelay,
      onSubmit,
      cardType,
      useHints,
      onClose,
    ]
  )

  const handleImageCardTypeSelect = useCallback(() => setCardType('image'), [])
  const handleNumberCardTypeSelect = useCallback(
    () => setCardType('number'),
    []
  )
  const handleHintDelayChange = useCallback((ev) => {
    setHintsDelay(isNaN(ev.target.valueAsNumber) ? '' : ev.target.valueAsNumber)
  }, [])

  return (
    <Dialog
      aria-labelledby="dialog-title"
      className={styles.container}
      onDismiss={onClose}
    >
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <h2 className={styles.title} id="dialog-title">
          Configuración
        </h2>

        <div className={styles.row}>
          <div className={styles.col}>
            <Label>Cargar preset</Label>
            <div className={styles.presetRow}>
              {(Object.keys(presets) as PresetName[]).map((id) => (
                <Btn
                  data-preset-id={id}
                  onClick={handlePreset}
                  small
                  key={`preset-${id}`}
                >
                  {presets[id].label}
                </Btn>
              ))}
            </div>

            <Input
              label="Escoba del"
              onChange={setTargetValue}
              required
              value={targetValue}
              type="number"
              min="2"
              id="targetValue"
              mt="1.25em"
            />

            <Input
              label="Cantidad de cartas por jugador"
              onChange={setPlayerCardsAmount}
              required
              value={playerCardsAmount}
              type="number"
              min="1"
              id="playerCardsAmount"
              mt="1.25em"
            />

            <Input
              label="Cantidad de cartas en la mesa"
              onChange={setTableCardsAmount}
              required
              value={tableCardsAmount}
              type="number"
              min="0"
              id="tableCardsAmount"
              mt="1.25em"
            />
          </div>

          <div className={styles.col}>
            <Input
              label="Cartas del mazo"
              onChange={setAvailableCards}
              required
              type="text"
              value={availableCards}
              rows={2}
              id="availableCards"
              mb="1.5em"
            />

            <Label>Tipo de carta</Label>
            <div className={styles.cardTypesContainer}>
              <label className={styles.cardIcon} htmlFor="cardType-image">
                <input
                  className="visuallyHidden"
                  onChange={handleImageCardTypeSelect}
                  tabIndex={-1}
                  checked={cardType === 'image'}
                  value="image"
                  name="cardType"
                  type="radio"
                  id="cardType-image"
                />
                <Card
                  isSelected={cardType === 'image'}
                  onClick={handleImageCardTypeSelect}
                  value={5}
                  type="image"
                  id={-1}
                />
                <span className="visuallyHidden">Dibujos</span>
              </label>
              <label className={styles.cardIcon} htmlFor="cardType-number">
                <input
                  className="visuallyHidden"
                  onChange={handleNumberCardTypeSelect}
                  tabIndex={-1}
                  checked={cardType === 'number'}
                  value="number"
                  name="cardType"
                  type="radio"
                  id="cardType-number"
                />
                <Card
                  isSelected={cardType === 'number'}
                  onClick={handleNumberCardTypeSelect}
                  value={5}
                  type="number"
                  id={-2}
                />
                <span className="visuallyHidden">Número</span>
              </label>
            </div>

            <Checkbox
              onChange={setPauseOnAiPlay}
              checked={pauseOnAiPlay}
              mt="1.5em"
            >
              Pausar cuando juega la máquina
            </Checkbox>

            <Checkbox
              onChange={handleUseHintsToggle}
              checked={useHints}
              mt="1em"
            >
              Mostrar pistas a los{' '}
              <input
                className={styles.hintDelayField}
                onChange={handleHintDelayChange}
                disabled={!useHints}
                required
                value={hintsDelay}
                type="number"
                min="1"
              />
              segundos
            </Checkbox>
          </div>
        </div>

        {message && <p>{message}</p>}

        <div className={styles.controls}>
          <Btn type="submit">Guardar</Btn>
          <Btn onClick={onClose} text>
            Cancelar
          </Btn>
        </div>
      </form>
    </Dialog>
  )
}

const ConfigFormPropTypes = {
  currentConfig: configPropTypes.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

ConfigForm.propTypes = ConfigFormPropTypes

type Props = PropTypes.InferProps<typeof ConfigFormPropTypes>

export default ConfigForm
