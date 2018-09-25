import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { SAFES } from 'utils/analytics/events'
import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'

class SignerAccount extends Component {
  componentDidMount = () => {
    const { account } = this.props
    createQrImage(
      document.getElementById('qr-signer-address'),
      account.secondFA.address,
      4
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { account } = this.props
    createQrImage(
      document.getElementById('qr-signer-address'),
      account.secondFA.address,
      4
    )
  }

  openEtherScan = async () => {
    const { account } = this.props
    await ga(['_trackEvent', SAFES, 'click-view-signer-account-on-etherscan', 'View signer account on Etherscan'])
    window.open('http://rinkeby.etherscan.io/address/' + account.secondFA.address)
  }

  render () {
    const { account } = this.props

    return (
      <Layout
        signerAccount={account.secondFA.address}
        openEtherScan={this.openEtherScan}
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
)(SignerAccount)
