import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import EthUtil from 'ethereumjs-util'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

import actions from './actions'

class PairingProcess extends Component {
  constructor(props) {
    super(props)

    const { masterPassword, connectionType } = this.props.location.state

    const mnemonic = Bip39.generateMnemonic()
    const seed = Bip39.mnemonicToSeed(mnemonic)
    const hdWallet = HdKey.fromMasterSeed(seed)
    const walletHdPath = 'm/44\'/60\'/0\'/0'
    this.account = hdWallet.derivePath(walletHdPath + '/0').getWallet()
    const address = this.account.getChecksumAddressString()

    const accountData = (masterPassword)
      ? CryptoJs.AES.encrypt(mnemonic, masterPassword).toString()
      : mnemonic

    this.props.onCreateAccount(address, accountData)
  }

  componentDidMount = () => {
    createQrImage(
      document.getElementById('pairing-qr'),
      this.generatePairingCode(this.account.getPrivateKey()),
      4
    )
  }

  generatePairingCode = (privateKey) => {
    const startDate = new Date()
    const expiryDate = new Date(startDate.setMinutes(startDate.getMinutes() + 10))

    const data = EthUtil.sha3('ns' + expiryDate.toISOString())
    const vrs = EthUtil.ecsign(data, privateKey)

    return JSON.stringify({
      expiryDate: expiryDate.toISOString(),
      signature: {
        v: vrs.v,
        r: EthUtil.bufferToHex(vrs.r),
        s: EthUtil.bufferToHex(vrs.s)
      }
    })
  }

  handlePaired = (e) => {
    // TO-DO: Manage pairing notifications
    // Reception of the safe address from the mobile app after the pairing.

    this.props.history.push('/account')
  }

  render() {
    return (
      <Layout handlePaired={this.handlePaired} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, seed) => dispatch(actions.createAccount(address, seed))
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(PairingProcess)
