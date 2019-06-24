import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bip39 from 'bip39'
import { Redirect } from 'react-router'

import { ga } from 'utils/analytics'
import { ONBOARDING } from 'utils/analytics/events'
import {
  createEthAccount,
  createAccountFromMnemonic
} from '../components/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import actions from './actions'
import { ACCOUNT_URL } from 'routes/routes'

class DownloadApps extends Component {
  constructor(props) {
    super(props)
    const { safes } = this.props

    this.pairedSafes = safes.safes.length

    this.state = {
      showQrAndroid: false,
      showQrIos: false,
      showQrPairing: false
    }

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  componentDidMount = () => {
    const { account, onCreateAccount } = this.props

    const hasAccount = account.secondFA && account.secondFA.seed

    if (hasAccount || !this.password) {
      return
    }

    const mnemonic = Bip39.generateMnemonic()
    const currentAccount = createAccountFromMnemonic(mnemonic, 0)
    const { encryptedMnemonic, hmac } = createEthAccount(
      mnemonic,
      this.password
    )

    onCreateAccount(
      currentAccount.getChecksumAddressString(),
      encryptedMnemonic,
      hmac
    )
  }

  toggleQrAndroid = () => {
    this.setState((prevState) => {
      if (!prevState.showQrAndroid) {
        ga([
          '_trackEvent',
          ONBOARDING,
          'click-download-android-app',
          'Download Android app'
        ])
      }
      return { showQrAndroid: !prevState.showQrAndroid }
    })
  }

  toggleQrIos = () => {
    this.setState((prevState) => {
      if (!prevState.showQrIos) {
        ga([
          '_trackEvent',
          ONBOARDING,
          'click-download-iphone-app',
          'Download iPhone app'
        ])
      }
      return { showQrIos: !prevState.showQrIos }
    })
  }

  toggleQrPairing = () => {
    this.setState((prevState) => {
      if (!prevState.showQrPairing) {
        ga([
          '_trackEvent',
          ONBOARDING,
          'click-show-pairing-qr-code',
          'Show pairing QR-code'
        ])
      }
      return { showQrPairing: !prevState.showQrPairing }
    })
  }

  render() {
    const { showQrAndroid, showQrIos, showQrPairing } = this.state
    const { safes, location } = this.props

    if (safes !== null && safes.safes.length > this.pairedSafes) {
      return <Redirect to={ACCOUNT_URL} />
    }
    return (
      <Layout
        toggleQrAndroid={this.toggleQrAndroid}
        toggleQrIos={this.toggleQrIos}
        toggleQrPairing={this.toggleQrPairing}
        showQrAndroid={showQrAndroid}
        showQrIos={showQrIos}
        showQrPairing={showQrPairing}
        password={this.password}
        location={location}
      />
    )
  }
}

const mapStateToProps = ({ account, safes }, props) => {
  return {
    account,
    safes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, seed, hmac) =>
      dispatch(actions.createAccount(address, seed, hmac))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadApps)
