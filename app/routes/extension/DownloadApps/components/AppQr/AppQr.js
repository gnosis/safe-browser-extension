import React, { Component } from 'react'

import { createQrImage } from 'utils/qrdisplay'
import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'
import {
  SAFE_FOR_ANDROID,
  SAFE_FOR_IOS
} from '../../../../../../config/messages'

class AppQr extends Component {
  componentDidMount = () => {
    const { link } = this.props

    createQrImage(
      document.getElementById('qr-app'),
      link,
      4
    )
  }

  handleOpenApp = (url) => (e) => {
    chrome.tabs.create({ url })
  }

  render () {
    const {
      toggleQr,
      os,
      link,
      storeImage
    } = this.props

    return (
      <div className={styles.innerOverlay}>
        <button
          className={styles.buttonExit}
          onClick={toggleQr}
        />
        <div className={styles.innerOverlayContent}>
          <span className={styles.QR}>
            <p>
              {(os === 'ANDROID')
                ? SAFE_FOR_ANDROID
                : SAFE_FOR_IOS
              }
            </p>
            <div id='qr-app' />
          </span>
          <img
            src={storeImage}
            onClick={this.handleOpenApp(link)}
            height='40'
            width='135'
          />
        </div>
        <NetworkNotification />
      </div>
    )
  }
}

export default AppQr
