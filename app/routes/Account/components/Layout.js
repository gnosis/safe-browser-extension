import React, { Component } from 'react'

import Page from 'components/Page'

class Layout extends Component {
  render() {
    const {
      address,
      network,
      handleShowQrCode,
    } = this.props

    return (
      <Page
        logOut={true}
        whitelist={true}
      >
        <p>Address: {address}</p>
        <p>Network: {network}</p>

        <button onClick={handleShowQrCode(address)}>Show QR code</button>

        <div id='qr'></div>
      </Page>
    )
  }
}

export default Layout
