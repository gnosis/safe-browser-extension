import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Page from 'components/Page'
import config from '../../../config'
import { createQrImage } from 'utils/qrdisplay'
import googlePlayBadge from 'assets/google-play-badge.png'
import appStoreBadge from 'assets/app-store-badge.png'

import { createAccount } from 'actions/account'

class DownloadApps extends Component {

  componentDidMount = () => {
    createQrImage(
      document.getElementById('qr-android'),
      config.androidAppLink,
      4
    )

    createQrImage(
      document.getElementById('qr-ios'),
      config.iOSAppLink,
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
      <Page>
        <div className='container'>
          <div className='title'>
            Download the mobile app
          </div>

          <div className='download-apps'>
            <div className='download-app'>
              <div>Android</div>
              <div id='qr-android'></div>

              <img
                className='app-link'
                src={googlePlayBadge}
                onClick={this.handleOpenApp(config.androidAppLink)}
              />
            </div>

            <div className='download-app'>
              <div>iOS</div>
              <div id='qr-ios'></div>

              <img
                className='app-link'
                src={appStoreBadge}
                onClick={this.handleOpenApp(config.iOSAppLink)}
              />
            </div>

            <div className='clean'></div>
          </div>

          <button onClick={this.handleCreateAccount}>Continue</button>
        </div>
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, mnemonic) => dispatch(createAccount(address, mnemonic))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DownloadApps) 