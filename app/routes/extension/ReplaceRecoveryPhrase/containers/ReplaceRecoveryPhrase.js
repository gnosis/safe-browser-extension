import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import {
  PASSWORD_URL,
  REPLACE_RECOVERY_PHRASE_URL
} from 'routes/routes'
import { createQrImage } from 'utils/qrdisplay'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import selector from './selector'

class ReplaceRecoveryPhrase extends Component {
  constructor (props) {
    super(props)

    this.qrReplaceRecoveryPhraseRef = React.createRef()

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  componentDidMount = () => {
    const { safes } = this.props
    createQrImage(
      document.getElementById('qr-replace-recovery-phrase'),
      this.generateQrCodeContent(safes.currentSafe),
      3
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { safes } = this.props
    createQrImage(
      document.getElementById('qr-replace-recovery-phrase'),
      this.generateQrCodeContent(safes.currentSafe),
      3
    )
  }

  generateQrCodeContent = (safeAddress) => {
    const {
      selectEncryptedMnemonic,
      selectUnencryptedMnemonicSelector
    } = this.props

    const account = !selectUnencryptedMnemonicSelector && this.password
      ? getDecryptedEthAccount(selectEncryptedMnemonic, this.password)
      : createAccountFromMnemonic(selectUnencryptedMnemonicSelector)

    const data = EthUtil.sha3('GNO' + safeAddress)
    const vrs = EthUtil.ecsign(data, account.getPrivateKey())
    const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
    const s = new BigNumber(EthUtil.bufferToHex(vrs.s))

    const qrCodeContent = JSON.stringify({
      address: safeAddress,
      signature: {
        r: r.toString(10),
        s: s.toString(10),
        v: vrs.v
      }
    })
    return qrCodeContent
  }

  render () {
    const { safes } = this.props
    const url = {
      pathname: PASSWORD_URL,
      state: {
        dest: REPLACE_RECOVERY_PHRASE_URL
      }
    }

    if (safes.currentSafe === undefined) {
      return <Redirect to={url} />
    }
    return (
      <Layout
        currentSafe={safes.currentSafe}
        qrReplaceRecoveryPhraseRef={this.qrReplaceRecoveryPhraseRef}
        location={this.props.location}
      />
    )
  }
}

export default connect(
  selector
)(ReplaceRecoveryPhrase)
