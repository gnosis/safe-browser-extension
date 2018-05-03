import React, { Component } from 'react'

import Page from 'components/Page'
import CreateAccount from './CreateAccount'
import LockedAccount from './LockedAccount'
import UnlockedAccount from './UnlockedAccount'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      qrPairingRef,
      hasAccount,
      hasLockedAccount,
      password,
      renderQrImageFrom,
      handlePaired,
    } = this.props

    return (
      <Page>
        <div className={styles.textContent}>
          Scan the QR code to pair this extension with your mobile app.
        </div>
        <div className={styles.qr} ref={qrPairingRef}></div>
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
        <button onClick={handlePaired}>CONTINUE</button>
      </Page>
    )
  }
}

export default Layout
