import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import {
  setUpNotifications,
  authPushNotificationService
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairingNotifications'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import selector from './selector'

class ResyncToken extends Component {
  constructor (props) {
    super(props)

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  handleResync = () => async (e) => {
    const {
      selectEncryptedMnemonic,
      selectUnencryptedMnemonicSelector
    } = this.props

    const currentAccount = !selectUnencryptedMnemonicSelector && this.password
      ? getDecryptedEthAccount(selectEncryptedMnemonic, this.password)
      : createAccountFromMnemonic(selectUnencryptedMnemonicSelector)

    try {
      const token = await setUpNotifications()
      if (token === null) return
      authPushNotificationService(token, currentAccount.getPrivateKey())
    } catch (err) {
      console.error(err)
    }
    ga(['_trackEvent', EXTENSION_SETTINGS, 'click-resync-push-token', 'Resync push token'])
  }

  render () {
    return (
      <Layout
        handleResync={this.handleResync}
      />
    )
  }
}

export default connect(
  selector
)(ResyncToken)
