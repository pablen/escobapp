import React, { useCallback, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import Input, { Label } from './Input'
import Checkbox from './Checkbox'
import presets, { ConfigOptions, PresetName } from '../presets'
import styles from './ConfigForm.module.css'
import dialogStyles from './Dialog.module.css'
import Card from './Card'
import Btn from './Btn'
import { format } from '../fractions'
import { validateConfigForm } from './configFormValidation'

const ConfigForm: React.FC<Props> = ({ onClose, onSubmit, currentConfig }) => {
  const [message, setMessage] = useState<string | null>(null)

  const [pauseOnAiPlay, setPauseOnAiPlay] = useState(
    currentConfig.pauseOnAiPlay,
  )

  const [playerCardsAmount, setPlayerCardsAmount] = useState<
    number | undefined
  >(currentConfig.playerCardsAmount)

  const [tableCardsAmount, setTableCardsAmount] = useState<number | undefined>(
    currentConfig.tableCardsAmount,
  )

  const [availableCards, setAvailableCards] = useState(
    currentConfig.availableCards.map(format).join(', '),
  )

  const [targetValue, setTargetValue] = useState(
    format(currentConfig.targetValue),
  )

  const [cardType, setCardType] = useState(currentConfig.cardType)
  const [useHints, setUseHints] = useState(currentConfig.hintsDelay > 0)
  const [hintsDelay, setHintsDelay] = useState<number | undefined>(
    currentConfig.hintsDelay || 5,
  )

  const handleUseHintsToggle = useCallback((newValue: boolean) => {
    if (newValue) {
      setHintsDelay(5)
    }
    setUseHints(newValue)
  }, [])

  const handlePreset: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (ev) => {
      if (typeof ev.currentTarget.dataset.presetId !== 'string') return
      const { options } =
        presets[ev.currentTarget.dataset.presetId as PresetName]
      setPlayerCardsAmount(options.playerCardsAmount)
      setTableCardsAmount(options.tableCardsAmount)
      setAvailableCards(options.availableCards.map(format).join(', '))
      setPauseOnAiPlay(options.pauseOnAiPlay)
      setTargetValue(format(options.targetValue))
      setHintsDelay(options.hintsDelay)
      setCardType(options.cardType)
    },
    [],
  )

  const handleSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      const result = validateConfigForm({
        availableCards,
        cardType,
        hintsDelay,
        pauseOnAiPlay,
        playerCardsAmount,
        tableCardsAmount,
        targetValue,
        useHints,
      })
      if (!result.success) {
        setMessage(result.error)
        return
      }
      setMessage(null)
      onClose()
      onSubmit(result.config)
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
    ],
  )

  const handleImageCardTypeSelect = useCallback(() => setCardType('image'), [])
  const handleNumberCardTypeSelect = useCallback(
    () => setCardType('number'),
    [],
  )
  const handleHintDelayChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setHintsDelay(
        isNaN(ev.target.valueAsNumber) ? undefined : ev.target.valueAsNumber,
      )
    },
    [],
  )

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.overlay} />
        <Dialog.Content
          className={[dialogStyles.content, styles.container].join(' ')}
          aria-describedby={undefined}
        >
          <form
            className={[dialogStyles.surface, styles.wrapper].join(' ')}
            onSubmit={handleSubmit}
          >
            <Dialog.Title
              className={[dialogStyles.title, styles.title].join(' ')}
            >
              Configuración
            </Dialog.Title>

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
                      {presets[id].label.replace(/ (\d+)$/, '')}
                      <br />
                      {presets[id].label.match(/\d+$/)?.[0]}
                    </Btn>
                  ))}
                </div>

                <Input
                  label="Escoba del"
                  onChange={setTargetValue}
                  required
                  value={targetValue}
                  type="text"
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
                  rows={3}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type Props = {
  currentConfig: ConfigOptions
  onSubmit: (config: ConfigOptions) => void
  onClose: () => void
}

export default ConfigForm
