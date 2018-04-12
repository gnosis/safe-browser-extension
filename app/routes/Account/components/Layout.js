import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'

class Layout extends Component {
  render() {
    const {
      address,
      network,
      handleShowQrCode,
    } = this.props

    return (
      <Page logOut settings whitelist>
        <Link to='/safes'>
          <button>Switch safe</button>
        </Link>
        <p>Address: {address}</p>
        <p>Network: {network}</p>
        <button onClick={handleShowQrCode(address)}>Show QR code</button>
        <div id='qr-safe-address'></div>
      </Page>
    )
  }
}

export default Layout
