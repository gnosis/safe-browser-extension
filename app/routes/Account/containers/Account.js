import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

class Account extends Component {

  handleShowQrCode = (data) => (e) => {
    createQrImage(
      document.getElementById('qr'),
      data,
      4
    )
  }

  render() {
    const { address } = this.props.account
    const network = config.networks[config.currentNetwork].url

    return (
      <Layout
        address={address}
        network={network}
        handleShowQrCode={this.handleShowQrCode}
      />
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
