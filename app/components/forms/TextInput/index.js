import React from 'react'
import styles from './style.css'

const TextInput = ({ dataValidation, ...props }) => (
  <div data-validation={dataValidation}>
    <input className={styles.textInput} {...props} />
  </div>
)

export default TextInput
