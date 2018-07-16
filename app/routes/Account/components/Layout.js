import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'

import Page from 'components/Page'
import WhitelistedDappState from './WhitelistedDappState/containers'
import styles from 'assets/css/global.css'

class Layout extends Component {
  render() {
    const {
      currentSafe,
      properties,
      openEtherScan,
    } = this.props

    return (
      <Page page={styles.safeOverview} properties={properties}>
        <div className={styles.content}>
          <WhitelistedDappState />
          <div className={styles.safeContent}>
            <span className={styles.QR}>
              <div>
                <div className={styles.identicon}>
                  <Blockies
                    seed={currentSafe}
                    size={8}
                    scale={3}
                  />
                </div>
                <p>{currentSafe}</p>
              </div>
              <div id='qr-safe-address'></div>
            </span>
            <Link
              to='#'
              className={styles.externalLink}
              onClick={openEtherScan}>
              View on Etherscan.io
            </Link>
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
