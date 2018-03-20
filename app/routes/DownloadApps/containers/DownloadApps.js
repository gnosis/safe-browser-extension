import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

import actions from './actions'

class DownloadApps extends Component {
  constructor(props) {
    super(props)

    this.androidAppLink = config.androidAppLink
    this.iOSAppLink = config.iOSAppLink
  }

  componentDidMount = () => {
    createQrImage(
      document.getElementById('qr-android'),
      this.androidAppLink,
      4
    )

    createQrImage(
      document.getElementById('qr-ios'),
      this.iOSAppLink,
      4
    )
  }

  handleCreateAccount = () => {
    const mnemonic = Bip39.generateMnemonic()
    const seed = Bip39.mnemonicToSeed(mnemonic)
    const hdWallet = HdKey.fromMasterSeed(seed)
    //console.log(mnemonic)

    // Get the first account using the standard hd path
    const walletHdPath = 'm/44\'/60\'/0\'/0'
    const address = hdWallet.derivePath(walletHdPath + '/0').getWallet().getChecksumAddressString()

    this.props.onCreateAccount(address, mnemonic)

    this.props.history.push('/account')
  }

  handleOpenApp = (url) => (e) => {
    chrome.tabs.create({ url })
  }

  render() {
    return (
      <Layout
        androidAppLink={this.androidAppLink}
        iOSAppLink={this.iOSAppLink}
        handleCreateAccount={this.handleCreateAccount}
        handleOpenApp={this.handleOpenApp}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, mnemonic) => dispatch(actions.createAccount(address, mnemonic))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DownloadApps)
