import React from 'react'
import styles from './style.css'

const RadioInput = ({ children, name, value, checked }) => (
  <div className={styles.radio}>
    <input type="radio" name={name} value={value} checked={checked} readOnly />
    {children}
  </div>
)

export default RadioInput
