import React, { useCallback } from 'react'
import { motion } from 'framer-motion'

import { CardIndex } from '../utils'
import CardFront from './CardFront'
import CardBack from './CardBack'
import FractionCardFront from './FractionCardFront'
import styles from './Card.module.css'
import { FractionInput, toFraction } from '../fractions'

const Card: React.FC<Props> = ({
  isReversed,
  isDisabled,
  isSelected,
  isHinted,
  onClick,
  value,
  type,
  id,
}) => {
  const fraction = toFraction(value)
  const isFraction = fraction.denominator !== 1
  const actualType =
    isFraction || fraction.numerator > 10 ? 'number' : type || 'image'
  const className = [
    styles.container,
    styles[`type-${actualType}`],
    isHinted ? styles.isHinted : '',
  ].join(' ')

  const image = isReversed ? (
    <CardBack className={styles.back} />
  ) : isFraction ? (
    <FractionCardFront className={styles.front} value={fraction} />
  ) : (
    <CardFront
      className={styles.front}
      value={fraction.numerator}
      type={actualType}
    />
  )

  const handleClick = useCallback(() => {
    if (onClick) onClick(id)
  }, [onClick, id])

  return onClick ? (
    <motion.button
      data-ishinted={isHinted}
      aria-pressed={!!isSelected}
      data-testid={`card-${id}`}
      className={className}
      disabled={!!isDisabled}
      layoutId={`card-${id}`}
      onClick={handleClick}
      type="button"
    >
      {image}
    </motion.button>
  ) : (
    <motion.div
      aria-pressed={!!isSelected}
      data-testid={`card-${id}`}
      className={className}
      layoutId={`card-${id}`}
    >
      {image}
    </motion.div>
  )
}

type Props = {
  id: CardIndex
  isDisabled?: boolean
  isHinted?: boolean
  isReversed?: boolean
  isSelected?: boolean
  onClick?: (id: CardIndex) => void
  type?: 'number' | 'image'
  value: FractionInput
}

export default Card
