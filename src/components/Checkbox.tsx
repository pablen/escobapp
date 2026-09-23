import React, { useCallback } from 'react'

import styles from './Checkbox.module.css'

const Checkbox: React.FC<Props> = ({
  labelProps,
  onChange,
  children,
  mt,
  mb,
  ...other
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked),
    [onChange],
  )

  const inlineStyles = {
    style: {
      ...(mb ? { marginBottom: mb } : {}),
      ...(mt ? { marginTop: mt } : {}),
    },
  }

  return (
    <label
      {...(mt || mb ? inlineStyles : {})}
      {...(labelProps || {})}
      className={[
        styles.container,
        labelProps && labelProps.className ? labelProps.className : '',
      ].join(' ')}
    >
      <input
        className={styles.input}
        onChange={handleChange}
        type="checkbox"
        {...other}
      />
      {children}
    </label>
  )
}

type Props = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'children' | 'onChange' | 'type'
> & {
  children: React.ReactNode
  labelProps?: React.ComponentPropsWithoutRef<'label'>
  mb?: string
  mt?: string
  onChange: (checked: boolean) => void
}

export default Checkbox
