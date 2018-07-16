import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bip39 from 'bip39'

import { setUpNotifications, authPushNotificationService } from './pairingNotifications'
import {
  createEthAccount,
  createAccountFromMnemonic
} from '../../containers/pairEthAccount'
import styles from './index.css'
import actions from './actions'

class CreateAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
    }
  }

  componentDidMount = () => {
    const { password } = this.props

    const mnemonic = Bip39.generateMnemonic()
    const currentAccount = createAccountFromMnemonic(mnemonic)
    const {
      encryptedMnemonic,
      hmac,
    } = createEthAccount(mnemonic, password)

    setUpNotifications()
      .then((token) => {
        if (token === null) {
          this.setState({
            message: 'Permission to receive notifications required.'
          })
          return
        }
        if (authPushNotificationService(token, currentAccount.getPrivateKey())) {
          this.props.onCreateAccount(currentAccount.getChecksumAddressString(), encryptedMnemonic, hmac)
        }
      })
      .catch((err) => console.error(err))
  }

  render() {
    const { message } = this.state

    return (
      <div className={styles.message}>
        {message && <div>{message}</div>}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, seed, hmac) => dispatch(actions.createAccount(address, seed, hmac)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(CreateAccount)
