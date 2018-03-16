import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import Header from 'components/Header'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../config'

class Account extends Component {

  handleShowQrCode = (data) => (e) => {
    createQrImage(
      document.getElementById('qr'),
      data,
      4
    )
  }

  render() {
    const { seed, address } = this.props.account

    return (
      <div>
        <Header
          logOut={true}
          whitelist={true}
        />
        
        <div className='container'>
          <p>Address: {address}</p>
          <p>Network: {config.networks[config.currentNetwork].url} </p>

          <button onClick={this.handleShowQrCode(address)}>Show QR code</button>

          <div id='qr'></div>
        </div>
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