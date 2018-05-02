import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bip39 from 'bip39'

import { setUpNotifications, authPushNotificationService } from './pairingNotifications'
import { createEthAccount } from '../../containers/pairEthAccount'
import styles from './index.css'
import actions from './actions'

class CreateAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      message: '',
    }
  }

  componentDidMount = () => {
    const { password } = this.props

    const mnemonic = Bip39.generateMnemonic()
    const {
      currentAccount,
      encryptedMnemonic,
      hmac,
    } = createEthAccount(mnemonic, password)

    setUpNotifications()
      .then((token) => {
        if (token !== null) {
          if (authPushNotificationService(token, currentAccount.getPrivateKey())) {
            this.setState({ loading: false })
            this.props.onCreateAccount(currentAccount.getChecksumAddressString(), encryptedMnemonic, hmac)
          }
        }
        else {
          this.setState({
            loading: false,
            message: 'Permission to receive notifications required.'
          })
        }
      })
      .catch((err) => console.error(err))
  }

  render() {
    const { loading, message } = this.state

    return (
      <div className={styles.message}>
        {loading && <div>Loading...</div>}
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
