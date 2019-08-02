import React from 'react'
import Paragraph from 'components/layout/Paragraph'
import styles from './style.css'

const Layout = ({ qrPairingRef, message }) => (
  <React.Fragment>
    {message ? (
      <Paragraph className={styles.message}>{message}</Paragraph>
    ) : (
      <div className={styles.qrCode} ref={qrPairingRef} />
    )}
  </React.Fragment>
)

export default Layout
