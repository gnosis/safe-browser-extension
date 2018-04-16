import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'
import {
  createAccountFromMnemonic,
  generatePairingCodeContent,
} from '../utils/ethOperations'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

import actions from './actions'

class PairingProcess extends Component {
  constructor(props) {
    super(props)

    this.qrPairingRef = React.createRef()
  }

  componentDidMount = () => {
    const { password, connectionType } = this.props.location.state

    if (connectionType !== '2FA' && connectionType !== 'RELAYER')
      return

    const currentAccount = this.getCurrentEthAccount(connectionType, password)
    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(currentAccount.getPrivateKey()),
      4
    )
  }

  getCurrentEthAccount = (connectionType, password) => {
    const hasAccounts = this.hasAccountsCreated()

    if (hasAccounts.length >= 2 || hasAccounts.includes(connectionType)) {
      return this.getExtensionEthAccount(connectionType, password)
    }
    else {
      const mnemonic = Bip39.generateMnemonic()
      const currentAccount = createAccountFromMnemonic(mnemonic)
      return this.createExtensionEthAccount(connectionType, password, mnemonic, currentAccount)
    }
  }

  hasAccountsCreated = () => {
    const { account } = this.props
    const result = []
    if (account.relayer && Object.keys(account.relayer).length > 0)
      result.push('RELAYER')
    if (account.secondFA && Object.keys(account.secondFA).length > 0)
      result.push('2FA')
    return result
  }

  getExtensionEthAccount = (connectionType, password) => {
    const { account } = this.props
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
    return createAccountFromMnemonic(mnemonic)
  }

  createExtensionEthAccount = (connectionType, password, mnemonic, currentAccount) => {
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

  handlePaired = (e) => {
    // MOCK CONNECTION TO SAFE ACCOUNT

    const { safes } = this.props
    const { connectionType } = this.props.location.state
    const connectedSafes = (safes.safes !== undefined)
      ? safes.safes.length
      : 0

    const newSafeAdress = config.mockSafesAdresses[connectedSafes]

    this.props.onAddSafe(newSafeAdress, connectionType)
    this.props.history.push('/account')
  }

  render() {
    return (
      <Layout
        handlePaired={this.handlePaired}
        qrPairingRef={this.qrPairingRef}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateRelayerAccount: (address, seed) => dispatch(actions.createRelayerAccount(address, seed)),
    onCreate2FAAccount: (address, seed, hmac) => dispatch(actions.create2FAAccount(address, seed, hmac)),
    onAddSafe: (address, connectionType) => dispatch(actions.addSafe(address, connectionType)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairingProcess)
