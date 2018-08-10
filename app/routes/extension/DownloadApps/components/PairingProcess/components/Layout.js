import React, { Component } from 'react'

import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'

class Layout extends Component {
  render () {
    const {
      qrPairingRef,
      toggleQr,
      message
    } = this.props

    return (
      <div className={styles.innerOverlay}>
        <button
          className={styles.buttonExit}
          onClick={toggleQr}
        />
        <div className={styles.innerOverlayContent}>
          <span className={styles.QR}>
            <p>BROWSER EXTENSION</p>
            <div ref={qrPairingRef} />
            <div className={styles.message}>
              {message && <div>{message}</div>}
            </div>
          </span>
        </div>
        <NetworkNotification />
      </div>
    )
  }
}

export default Layout
