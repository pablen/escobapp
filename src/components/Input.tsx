import React, { useCallback } from 'react'

import styles from './Input.module.css'

export const Label: React.FC<LabelProps> = ({ children, ...other }) => (
  <label className={styles.label} {...other}>
    {children}
  </label>
)

type LabelProps = React.ComponentPropsWithoutRef<'label'> & {
  children: React.ReactNode
}

const Input: React.FC<Props> = (props) => {
  const {
    labelProps = {},
    className,
    onChange,
    label,
    type,
    value,
    rows,
    id,
    mt,
    mb,
    ...other
  } = props

  const handleChange: React.FormEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      if (type === 'number') {
        onChange(
          isNaN(ev.currentTarget.valueAsNumber)
            ? undefined
            : ev.currentTarget.valueAsNumber,
        )
      } else {
        onChange(ev.currentTarget.value)
      }
    },
    [onChange, type],
  )

  const inlineStyles = {
    style: {
      ...(mb ? { marginBottom: mb } : {}),
      ...(mt ? { marginTop: mt } : {}),
    },
  }

  return (
    <div
      className={[styles.container, className || ''].join(' ')}
      {...(mt || mb ? inlineStyles : {})}
    >
      <Label htmlFor={id} {...labelProps}>
        {label}
      </Label>
      {React.createElement(typeof rows === 'number' ? 'textarea' : 'input', {
        className: [styles.input, styles[`type-${type}`]].join(' '),
        onChange: handleChange,
        name: id,
        type,
        rows,
        id,
        value: value ?? '',
        ...other,
      })}
    </div>
  )
}

type BaseProps = {
  className?: string
  id: string
  label: string
  labelProps?: React.ComponentPropsWithoutRef<'label'>
  mb?: string
  min?: number | string
  mt?: string
  required?: boolean
  rows?: number
}

interface TextProps extends BaseProps {
  type: 'text'
  onChange: (v: string) => void
  value: string
}

interface NumberProps extends BaseProps {
  type: 'number'
  onChange: (v?: number) => void
  value?: number
}

type Props = TextProps | NumberProps

export default Input
