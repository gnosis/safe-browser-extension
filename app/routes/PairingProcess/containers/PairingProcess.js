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
    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    const password = (validPassword) ? location.state.password : undefined
    const currentAccount = this.getCurrentEthAccount(password)

    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(currentAccount.getPrivateKey()),
      4
    )
  }

  getCurrentEthAccount = (password) => {
    const { account } = this.props
    if (account.secondFA && Object.keys(account.secondFA).length > 0) {
      return (account.lockedState && password)
        ? this.getDecryptedEthAccount(password)
        : this.getUnencryptedEthAccount(account.unlockedSeed)
    }
    else {
      const mnemonic = Bip39.generateMnemonic()
      const currentAccount = createAccountFromMnemonic(mnemonic)
      return this.createEthAccount(password, mnemonic, currentAccount)
    }
  }

  getDecryptedEthAccount = (password) => {
    const { account } = this.props
    const encryptedMnemonic = account.secondFA.seed
    const mnemonic = CryptoJs.AES.decrypt(encryptedMnemonic, password).toString(CryptoJs.enc.Utf8)

    return createAccountFromMnemonic(mnemonic)
  }

  getUnencryptedEthAccount = (mnemonic) => {
    return createAccountFromMnemonic(mnemonic)
  }

  createEthAccount = (password, mnemonic, currentAccount) => {
    const encryptedMnemonic = CryptoJs.AES.encrypt(mnemonic, password).toString()
    const hmac = CryptoJs.HmacSHA256(encryptedMnemonic, CryptoJs.SHA256(password)).toString()

    this.props.onCreateAccount(currentAccount.getChecksumAddressString(), encryptedMnemonic, hmac)
    return currentAccount
  }

  handlePaired = (e) => {
    // MOCK CONNECTION TO SAFE ACCOUNT
    const { safes } = this.props
    const connectedSafes = (safes.safes !== undefined)
      ? safes.safes.length
      : 0

    const newSafeAdress = config.mockSafesAdresses[connectedSafes]
    this.props.onAddSafe(newSafeAdress)
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
    onCreateAccount: (address, seed, hmac) => dispatch(actions.createAccount(address, seed, hmac)),
    onAddSafe: (address) => dispatch(actions.addSafe(address)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairingProcess)
