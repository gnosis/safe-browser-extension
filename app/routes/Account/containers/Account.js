import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'

class Account extends Component {
  componentDidMount = () => {
    const { safes } = this.props

    createQrImage(
      document.getElementById('qr-safe-address'),
      safes.currentSafe,
      4
    )
  }

  openEtherScan = () => {
    const { safes } = this.props
    window.open('http://rinkeby.etherscan.io/address/' + safes.currentSafe)
  }

  render() {
    const { account, safes } = this.props
    return (
      <Layout
        currentSafe={safes.currentSafe}
        openEtherScan={this.openEtherScan}
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
