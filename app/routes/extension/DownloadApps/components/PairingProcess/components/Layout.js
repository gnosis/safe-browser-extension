import React, { Component } from 'react'

import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'
import {
  BROWSER_EXTENSION,
  SHOW_QR_CODE_DESCRIPTION
} from '../../../../../../../config/messages'

class Layout extends Component {
  render() {
    const { qrPairingRef, toggleQr, message } = this.props

    return (
      <div className={styles.innerOverlay}>
        <button className={styles.buttonExit} onClick={toggleQr} />
        <div className={styles.innerOverlayContent}>
          <p>{SHOW_QR_CODE_DESCRIPTION}</p>
          <span className={styles.QR}>
            <p>{BROWSER_EXTENSION}</p>
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
