import React from 'react'
import classNames from 'classnames/bind'
import styles from './style.css'

const cx = classNames.bind(styles)

const AuthenticatorButton = ({
  naked,
  disabled,
  noUppercase,
  className,
  ...props
}) => (
  <button
    className={cx(
      styles.button,
      disabled && styles.disabled,
      naked && styles.naked,
      noUppercase && styles.noUppercase,
      className
    )}
    disabled={disabled}
    {...props}
  />
)

export default AuthenticatorButton
