import React, { useState, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import Checkbox from './Checkbox'
import styles from './RulesDialog.module.css'
import dialogStyles from './Dialog.module.css'
import Btn from './Btn'
import { format } from '../fractions'
import { ConfigOptions } from '../presets'

const RulesDialog: React.FC<Props> = ({ onClose, currentConfig }) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)

  const handleStart = useCallback(() => {
    if (doNotShowAgain) {
      window.localStorage.setItem('showRules', 'false')
    }
    onClose()
  }, [doNotShowAgain, onClose])

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.overlay} />
        <Dialog.Content
          className={[dialogStyles.content, styles.container].join(' ')}
          aria-describedby={undefined}
        >
          <div className={[dialogStyles.surface, styles.wrapper].join(' ')}>
            <Dialog.Title
              className={[dialogStyles.title, styles.title].join(' ')}
            >
              Reglas del juego
            </Dialog.Title>

            <p>
              Intentar reunir la mayor cantidad de cartas de la mesa con una de
              las propias que sumen{' '}
              <strong>{format(currentConfig.targetValue)}</strong>.
            </p>
            <p>
              Si no se puede jugar se debe <strong>descartar</strong>.
            </p>
            <p>
              Levantar todas las cartas de la mesa suma una{' '}
              <strong>escoba</strong>.
            </p>
            <p>Al finalizar el juego se suma:</p>
            <p>
              <strong>1 punto por cada escoba.</strong>
            </p>
            <p>
              <strong>1 punto al que juntó más cartas.</strong>
            </p>

            <div className={styles.checkboxContainer}>
              <Checkbox onChange={setDoNotShowAgain} checked={doNotShowAgain}>
                No volver a mostrar
              </Checkbox>
            </div>

            <div className={styles.controls}>
              <Btn onClick={handleStart} autoFocus>
                ¡EMPEZAR!
              </Btn>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type Props = { currentConfig: ConfigOptions; onClose: () => void }

export default RulesDialog
