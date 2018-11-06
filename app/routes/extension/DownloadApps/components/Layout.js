import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import AppQr from './AppQr/AppQr'
import PairingProcess from './PairingProcess/containers/PairingProcess'
import styles from 'assets/css/global.css'
import playStore from 'assets/images/playstore.svg'
import appStore from 'assets/images/appstore.svg'
import {
  getAndroidAppUrl,
  getIosAppUrl
} from '../../../../../config'

const cx = classNames.bind(styles)

class Layout extends Component {
  constructor (props) {
    super(props)

    this.androidAppUrl = getAndroidAppUrl()
    this.iosAppUrl = getIosAppUrl()
  }

  render () {
    const {
      toggleQrAndroid,
      toggleQrIos,
      toggleQrPairing,
      showQrAndroid,
      showQrIos,
      showQrPairing,
      password
    } = this.props

    return (
      <React.Fragment>
        <Page
          page={styles.appConnect}
          simpleHeader
          noBorder
        >
          <div className={cx(styles.content, (showQrAndroid || showQrIos || showQrPairing) && styles.blur)}>
            <h1>Extension setup succesfully!<br /><strong>Connect with the mobile app.</strong></h1>
            <ol>
              <li>
                <p>Download &amp; install the mobile app</p>
                <button onClick={toggleQrIos} data-os='ios'>iPhone &amp; iPad</button>
                <button onClick={toggleQrAndroid} data-os='android'>Android</button>
              </li>
              <li>
                <p>Connect extension with mobile app by scanning the QR code</p>
                <button
                  onClick={toggleQrPairing}
                  className={styles.button}
                  data-qr='mobilepair'
                >
                  SHOW QR CODE
                </button>
              </li>
            </ol>
          </div>
        </Page>
        {showQrAndroid &&
          <AppQr
            toggleQr={toggleQrAndroid}
            os='ANDROID'
            link={this.androidAppUrl}
            storeImage={playStore}
          />
        }
        {showQrIos &&
          <AppQr
            toggleQr={toggleQrIos}
            os='IOS'
            link={this.iosAppUrl}
            storeImage={appStore}
          />
        }
        {showQrPairing &&
          <PairingProcess
            toggleQr={toggleQrPairing}
            password={password}
          />
        }
      </React.Fragment>
    )
  }
}

export default Layout
