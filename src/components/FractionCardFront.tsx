import React from 'react'

import { FractionValue } from '../fractions'

const FractionCardFront: React.FC<{
  value: FractionValue
  className?: string
}> = ({ value, className }) => (
  <svg
    preserveAspectRatio="xMinYMin"
    data-cardtype="fraction"
    className={className}
    aria-label={`${value.numerator}/${value.denominator}`}
    viewBox="0 0 62 88"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="0" width="62" height="88" rx="4" ry="4" fill="white" />
    <rect
      x="4"
      y="4"
      width="54"
      height="80"
      rx="1.5"
      ry="1.5"
      fill="transparent"
      stroke="silver"
      strokeWidth="0.5"
    />
    <text
      textAnchor="middle"
      fontFamily="sans-serif"
      fontSize="24"
      x="31"
      y="39"
    >
      {value.numerator}
    </text>
    <line x1="15" x2="47" y1="45" y2="45" stroke="currentColor" />
    <text
      textAnchor="middle"
      fontFamily="sans-serif"
      fontSize="24"
      x="31"
      y="70"
    >
      {value.denominator}
    </text>
  </svg>
)

export default FractionCardFront
