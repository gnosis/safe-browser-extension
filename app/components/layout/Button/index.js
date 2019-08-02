import React from 'react'
import classNames from 'classnames/bind'
import styles from './style.css'

const cx = classNames.bind(styles)

const AuthenticatorButton = ({ naked, className, ...props }) => (
  <button
    className={cx(styles.button, naked && styles.naked, className)}
    {...props}
  />
)

export default AuthenticatorButton
