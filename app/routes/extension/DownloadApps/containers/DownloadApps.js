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
import { ACCOUNT_URL } from 'routes/routes'
import actions from './actions'
import { getAndroidAppUrl, getIosAppUrl } from '../../../../../config'

class DownloadApps extends Component {
  constructor(props) {
    super(props)

    const { safes } = this.props
    this.pairedSafes = safes.safes.length
    this.iosAppUrl = getIosAppUrl()
    this.androidAppUrl = getAndroidAppUrl()

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

  openGooglePlay = (e) => {
    chrome.tabs.create({ url: this.androidAppUrl })
    ga([
      '_trackEvent',
      ONBOARDING,
      'click-download-android-app',
      'Download Android app'
    ])
  }

  openAppStore = (e) => {
    chrome.tabs.create({ url: this.iosAppUrl })
    ga([
      '_trackEvent',
      ONBOARDING,
      'click-download-iphone-app',
      'Download iPhone app'
    ])
  }

  render() {
    const { safes, location } = this.props

    if (safes !== null && safes.safes.length > this.pairedSafes) {
      return <Redirect to={ACCOUNT_URL} />
    }
    return (
      <Layout
        password={this.password}
        location={location}
        openGooglePlay={this.openGooglePlay}
        openAppStore={this.openAppStore}
        iosAppUrl={this.iosAppUrl}
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
