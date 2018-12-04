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
import {
  CONNECTED_EXTENSION_SUCCESFULLY,
  // IPHONE_AND_IPAD,
  ANDROID,
  DOWNLOAD_MOBILE_APP,
  CONNECT_EXTENSION_EXPLANATION,
  SHOW_QR_CODE
} from '../../../../../config/messages'

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
            <h1>{CONNECTED_EXTENSION_SUCCESFULLY}</h1>
            <ol>
              <li>
                <p>{DOWNLOAD_MOBILE_APP}</p>
                {/* <button onClick={toggleQrIos} data-os='ios'>{IPHONE_AND_IPAD}</button> */}
                <button onClick={toggleQrAndroid} data-os='android'>{ANDROID}</button>
              </li>
              <li>
                <p>{CONNECT_EXTENSION_EXPLANATION}</p>
                <button
                  onClick={toggleQrPairing}
                  className={styles.button}
                  data-qr='mobilepair'
                >
                  {SHOW_QR_CODE}
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
