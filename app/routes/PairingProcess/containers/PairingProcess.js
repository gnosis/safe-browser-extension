import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bip39 from 'bip39'

import Layout from '../components/Layout'
import {
  createAccountFromMnemonic,
  createEthAccount,
  getDecryptedEthAccount,
  getUnencryptedEthAccount,
  generatePairingCodeContent,
} from './pairEthAccount'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

import actions from './actions'
import selector from './selector'

class PairingProcess extends Component {
  constructor(props) {
    super(props)

    this.qrPairingRef = React.createRef()
  }

  componentDidMount = () => {
    const {
      location,
      hasAccount,
      hasLockedAccount,
      selectEncryptedMnemonic,
      selectUnencryptedMnemonic,
    } = this.props
    const validPassword = location && location.state && location.state.password
    const password = validPassword ? location.state.password : undefined

    if (!hasAccount) {
      const mnemonic = Bip39.generateMnemonic()
      const  {
        currentAccount,
        encryptedMnemonic,
        hmac,
      } = createEthAccount(mnemonic, password)
      this.props.onCreateAccount(currentAccount.getChecksumAddressString(), encryptedMnemonic, hmac)
      return this.renderQrImageFrom(currentAccount.getPrivateKey())
    }

    if (hasLockedAccount && password) {
      const localAccount = getDecryptedEthAccount(selectEncryptedMnemonic, password)
      return this.renderQrImageFrom(localAccount.getPrivateKey())
    }

    if (!hasLockedAccount && !password) {
      const localAccount = getUnencryptedEthAccount(selectUnencryptedMnemonic)
      return this.renderQrImageFrom(localAccount.getPrivateKey())
    }
  }

  renderQrImageFrom = (privateKey) => {
    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(privateKey),
      4
    )
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

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, seed, hmac) => dispatch(actions.createAccount(address, seed, hmac)),
    onAddSafe: (address) => dispatch(actions.addSafe(address)),
  }
}

export default connect(
  selector,
  mapDispatchToProps,
)(PairingProcess)
