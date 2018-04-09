import React, { Component } from 'react'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      handlePaired,
      qrPairingRef
    } = this.props

    return (
      <Page>
        <div className={styles.textContent}>
          Scan the QR code to pair this extension with your mobile app.
        </div>
        <div className={styles.qr} ref={qrPairingRef}></div>
        <button onClick={handlePaired}>CONTINUE</button>
      </Page>
    )
  }
}

export default Layout
