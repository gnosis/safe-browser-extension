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

  componentDidMount = () => {
    const { password, connectionType } = this.props.location.state
    const { account } = this.props

    if (connectionType !== '2FA' && connectionType !== 'RELAYER')
      return

    const hasAccounts = this.hasAccountsCreated(account)

    const currentAccount = (hasAccounts.length >= 2 || hasAccounts.includes(connectionType))
      ? this.getExtensionEthAccount(account, connectionType, password)
      : this.createExtensionEthAccount(connectionType, password)

    createQrImage(
      document.getElementById('pairing-qr'),
      this.generatePairingCode(currentAccount.getPrivateKey()),
      4
    )
  }

  hasAccountsCreated = (account) => {
    const result = []

    if (account.relayer !== undefined)
      result.push('RELAYER')
    if (account.secondFA !== undefined)
      result.push('2FA')
    return result
  }

  createAccountFromMnemonic = (mnemonic) => {
    const seed = Bip39.mnemonicToSeed(mnemonic)
    const hdWallet = HdKey.fromMasterSeed(seed)
    const walletHdPath = 'm/44\'/60\'/0\'/0'
    const newAccount = hdWallet.derivePath(walletHdPath + '/0').getWallet()
    return newAccount
  }

  getExtensionEthAccount = (account, connectionType, password) => {
    let mnemonic

    switch (connectionType) {
      case 'RELAYER':
        mnemonic = account.relayer.seed
        break

      case '2FA':
        const encryptedMnemonic = account.secondFA.seed
        mnemonic = CryptoJs.AES.decrypt(encryptedMnemonic, password).toString(CryptoJs.enc.Utf8)
        break

      default:
        return
    }
    return this.createAccountFromMnemonic(mnemonic)
  }

  createExtensionEthAccount = (connectionType, password) => {
    const mnemonic = Bip39.generateMnemonic()
    const currentAccount = this.createAccountFromMnemonic(mnemonic)

    switch (connectionType) {
      case 'RELAYER':
        this.props.onCreateRelayerAccount(currentAccount.getChecksumAddressString(), mnemonic)
        break

      case '2FA':
        const encryptedMnemonic = CryptoJs.AES.encrypt(mnemonic, password).toString()
        const hmac = CryptoJs.HmacSHA256(encryptedMnemonic, CryptoJs.SHA256(password)).toString()
        this.props.onCreate2FAAccount(currentAccount.getChecksumAddressString(), encryptedMnemonic, hmac)
        break

      default:
        return
    }

    return currentAccount
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

const mapStateToProps = ({ account }, props) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateRelayerAccount: (address, seed) => dispatch(actions.createRelayerAccount(address, seed)),
    onCreate2FAAccount: (address, seed, hmac) => dispatch(actions.create2FAAccount(address, seed, hmac)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairingProcess)
