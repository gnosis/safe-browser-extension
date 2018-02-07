import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import { createQrImage } from '../../utils/qrdisplay'

class Account extends Component {

  handleShowQrCode() {
    createQrImage(
      document.getElementById('qr'),
      this.hdWallet.getChecksumAddressString()
    )
  }

  componentWillMount() {
    const { password, v3 } = this.props.state

    this.hdWallet = wallet.fromV3(v3, password)
  }

  render() {
    return (
      <div>
        Address: {this.hdWallet.getChecksumAddressString()}
        
        <br /><br />
        
        <button onClick={() => this.handleShowQrCode()}>Show QR code</button>

        <div id='qr'></div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    state: state.account
  }
}

export default connect(
  mapStateToProps
)(Account)