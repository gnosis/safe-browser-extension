import React from 'react'
import classNames from 'classnames'
import styles from './style.css'

const cx = classNames.bind(styles)

const TextInput = ({ dataValidation, className, ...props }) => (
  <div data-validation={dataValidation}>
    <input className={cx(styles.textInput, className)} {...props} />
  </div>
)

export default TextInput
