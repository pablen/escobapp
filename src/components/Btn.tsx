import React from 'react'

import styles from './Btn.module.css'

const Btn: React.FC<Props> = ({
  className = '',
  children,
  small,
  type = 'button',
  text,
  ...other
}) => (
  <button
    className={[
      styles.container,
      small ? styles.isSmall : '',
      text ? styles.isText : '',
      className,
    ].join(' ')}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...other}
  >
    {children}
  </button>
)

type Props = React.ComponentPropsWithoutRef<'button'> & {
  small?: boolean
  text?: boolean
}

export default Btn
