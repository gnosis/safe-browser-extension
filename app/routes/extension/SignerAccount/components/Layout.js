import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Blockie from 'components/Blockie'
import classNames from 'classnames'

import Page from 'components/Page'
import { ACCOUNT_URL } from 'routes/routes'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render () {
    const {
      signerAccount,
      openEtherScan
    } = this.props

    return (
      <Page>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)}>
              <p>Back</p>
            </Link>
            <h2>Signer account</h2>
          </span>
          <div className={styles.overlayPageContent}>
            <div className={styles.safeContent}>
              <span className={styles.QR}>
                <div>
                  <div className={styles.identicon}>
                    <Blockie address={signerAccount} diameter={32} />
                  </div>
                  <p>{signerAccount}</p>
                </div>
                <div id='qr-signer-address' />
              </span>
              <Link
                to='#'
                className={styles.externalLink}
                onClick={openEtherScan}>
                View on Etherscan.io
              </Link>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
