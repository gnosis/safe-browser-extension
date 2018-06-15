import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUpNotifications, authPushNotificationService } from '../../PairingProcess/components/CreateAccount/pairingNotifications'
import { getDecryptedEthAccount } from '../../PairingProcess/containers/pairEthAccount'

import Layout from '../components/Layout'
import selector from './selector'

class ResyncToken extends Component {
  
  constructor(props) {
    super(props)
  }
  
  handleResync = () => (e) => {
    const {
      selectEncryptedMnemonic
    } = this.props

    setUpNotifications()
      .then((token) => {
        const password = this.props.location.state.password
        const currentAccount = getDecryptedEthAccount(selectEncryptedMnemonic, password)
        console.log(currentAccount)
        if (token === null) {
          console.log("No token available")
          return
        }
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
