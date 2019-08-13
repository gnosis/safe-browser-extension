import React from 'react'
import { getNetwork } from '../../../../config'
import styles from './style.css'

const SimpleHeader = () => (
  <header className={styles.header}>
    <span className={styles.safeIcon} data-network={getNetwork()} />
  </header>
)

export default SimpleHeader
