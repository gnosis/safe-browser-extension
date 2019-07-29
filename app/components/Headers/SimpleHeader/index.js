import React from 'react'
import classNames from 'classnames'
import styles from '../style.css'

const cx = classNames.bind(styles)

const SimpleHeader = () => (
  <header className={styles.header}>
    <span className={styles.safeIcon} />
  </header>
)

export default SimpleHeader
