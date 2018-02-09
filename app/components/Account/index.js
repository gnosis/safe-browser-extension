import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import { createQrImage } from '../../utils/qrdisplay'

class Account extends Component {

  handleShowQrCode(data) {
    createQrImage(
      document.getElementById('qr'),
      data
    )
  }

  render() {
    const { seed, address } = this.props.account

    return (
      <div>
        <span>Address: {address}</span>

        <button onClick={() => this.handleShowQrCode(address)}>Show QR code</button>

        <div id='qr'></div>
      </div>
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account
  }
}

export default connect(
  mapStateToProps
)(Account)