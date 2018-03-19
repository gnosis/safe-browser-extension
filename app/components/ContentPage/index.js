import React from 'react'

import styles from './index.css'

const ContentPage = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
)

export default ContentPage