import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'

class Account extends Component {

  handleShowQrCode = (data) => (e) => {
    createQrImage(
      document.getElementById('qr-safe-address'),
      data,
      4
    )
  }

  render() {
    const { account, safes } = this.props
    return (
      <Layout
        currentSafe={safes.currentSafe}
        properties={this.props.location}
        handleShowQrCode={this.handleShowQrCode}
      />
    )
  }
}

const mapStateToProps = ({ account, safes }, props) => {
  return {
    account,
    safes,
  }
}

export default connect(
  mapStateToProps
)(Account)
