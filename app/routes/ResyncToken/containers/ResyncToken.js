import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setUpNotifications, authPushNotificationService } from 'routes/DownloadApps/components/PairingProcess/components/CreateAccount/pairingNotifications'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic,
} from 'routes/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import selector from './selector'

class ResyncToken extends Component {
  constructor(props) {
    super(props)

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }
  
  handleResync = () => (e) => {
    const {
      selectEncryptedMnemonic,
      selectUnencryptedMnemonicSelector,
    } = this.props

    const currentAccount = !selectUnencryptedMnemonicSelector && this.password
      ? getDecryptedEthAccount(selectEncryptedMnemonic, this.password)
      : createAccountFromMnemonic(selectUnencryptedMnemonicSelector)

    setUpNotifications()
      .then((token) => {
        if (token === null) {
          console.log('No token available')
          return
        }
        console.log(token)
        authPushNotificationService(token, currentAccount.getPrivateKey())
      })
      .catch((err) => console.error(err))
  }

  render() {
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
