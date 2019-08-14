import React from 'react'
import styles from './style.css'

const SafesLocked = ({ handleUnlockAccount }) => (
  <span
    className={styles.lockedState}
    data-locked="true"
    onClick={handleUnlockAccount}
  />
)

export default SafesLocked
