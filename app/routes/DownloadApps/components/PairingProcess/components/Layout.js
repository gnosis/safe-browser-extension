import React, { Component } from 'react'

import CreateAccount from './CreateAccount'
import LockedAccount from './LockedAccount'
import UnlockedAccount from './UnlockedAccount'
import styles from 'assets/css/global.css'

class Layout extends Component {
  render() {
    const {
      qrPairingRef,
      hasAccount,
      hasLockedAccount,
      password,
      renderQrImageFrom,
      handlePaired,
      toggleQr,
    } = this.props

    return (
      <div className={styles.innerOverlay}>
        <button
          className={styles.buttonExit}
          onClick={toggleQr}
        ></button>
        <div className={styles.innerOverlayContent}>
          <span className={styles.QR}>
            <p>BROWSER EXTENSION</p>
            <div ref={qrPairingRef}></div>
            {!hasAccount && password &&
              <CreateAccount password={password} />
            }
            {!hasLockedAccount && !password &&
              <UnlockedAccount renderQrImageFrom={renderQrImageFrom} />
            }
            {hasLockedAccount && password &&
              <LockedAccount
                password={password}
                renderQrImageFrom={renderQrImageFrom}
              />
            }
          </span>
        </div>
      </div>
    )
  }
}

export default Layout
