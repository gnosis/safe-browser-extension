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
import {
  ERROR_SYNCING,
  SYNCED_TOKEN
} from '../../../../../config/messages'

class ResyncToken extends Component {
  constructor (props) {
    super(props)

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined

    this.state = {
      message: undefined
    }
  }

  handleResync = () => async (e) => {
    const {
      selectEncryptedMnemonic,
      selectUnencryptedMnemonic
    } = this.props

    const currentAccount = !selectUnencryptedMnemonic && this.password
      ? getDecryptedEthAccount(selectEncryptedMnemonic, this.password)
      : createAccountFromMnemonic(selectUnencryptedMnemonic)

      try {
      const token = await setUpNotifications()
      if (token === null) {
        this.setState({ message: ERROR_SYNCING })
        return
      }
      authPushNotificationService(token, [currentAccount.getPrivateKey()])
      this.setState({ message: SYNCED_TOKEN })
    } catch (err) {
      this.setState({ message: ERROR_SYNCING })
      console.error(err)
    }

    ga(['_trackEvent', EXTENSION_SETTINGS, 'click-resync-push-token', 'Resync push token'])

    setTimeout(() => {
      this.setState({ message: undefined })
    }, 1000)
  }

  render () {
    const { message } = this.state

    return (
      <Layout
        handleResync={this.handleResync}
        message={message}
        location={this.props.location}
      />
    )
  }
}

export default connect(
  selector
)(ResyncToken)
