import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import LockingState from './LockingState'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      currentSafe,
      properties,
      handleShowQrCode
    } = this.props

    return (
      <Page logOut settings whitelist padding='noPadding'>
        <LockingState properties={properties} />
        <div className={styles.innerPage}>
          <Link to='/safes'>
            <button>Switch safe</button>
          </Link>
          <p>Address: {currentSafe}</p>
          <button onClick={handleShowQrCode(currentSafe)}>Show QR code</button>
          <div id='qr-safe-address'></div>
        </div>
      </Page>
    )
  }
}

export default Layout
