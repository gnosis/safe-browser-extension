import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

class Account extends Component {

  handleShowQrCode = (data) => (e) => {
    createQrImage(
      document.getElementById('qr-safe-address'),
      data,
      4
    )
  }

  render() {
    const { currentSafe } = this.props.safes
    const network = config.networks[config.currentNetwork].url

    return (
      <Layout
        address={currentSafe}
        network={network}
        handleShowQrCode={this.handleShowQrCode}
      />
    )
  }
}

const mapStateToProps = ({ safes }, props) => {
  return {
    safes,
  }
}

export default connect(
  mapStateToProps
)(Account)
