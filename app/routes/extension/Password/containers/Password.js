import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'
import {
  setUpNotifications,
  authPushNotificationService
} from 'routes/extension/DownloadApps/containers/pairingNotifications'
import { getDecryptedAllEthAccounts } from 'routes/extension/DownloadApps/containers/pairEthAccount'
import actions from './actions'
import selector from './selector'
import Layout from '../components/Layout'

class Password extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      errorMessage: '',
      continue: false,
      dataValidation: ''
    }
  }

  updatePassword = (e) => {
    const currentPassword = e.target.value
    this.setState({ password: currentPassword })
  }

  validatePasswords = async () => {
    const { password } = this.state
    const { account } = this.props
    const encryptedSeed = account.secondFA.seed
    const decryptedHmac = CryptoJs.HmacSHA256(
      encryptedSeed,
      CryptoJs.SHA256(password)
    ).toString()

    if (decryptedHmac === account.secondFA.hmac) {
      this.setState({ dataValidation: '' })
      await this.notifyVersionUpdate()
      this.setState({ continue: true })
      return
    }

    this.setState({ dataValidation: 'ERROR_SHAKE' })
    setTimeout(() => {
      this.setState({ dataValidation: '' })
    }, 500)
  }

  notifyVersionUpdate = async () => {
    const { password } = this.state
    const {
      device,
      notifyDeviceUpdated,
      selectEncryptedMnemonic,
      safes
    } = this.props

    if (!device.lastUpdateNotified && password && selectEncryptedMnemonic) {
      try {
        const accounts = getDecryptedAllEthAccounts(
          selectEncryptedMnemonic,
          password,
          safes
        )
        const token = await setUpNotifications()
        const auth = await authPushNotificationService(token, accounts)
        if (token && auth) {
          notifyDeviceUpdated()
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  render() {
    const { password, dataValidation } = this.state

    if (this.state.continue) {
      return (
        <Redirect
          to={{
            pathname: this.props.location.state.dest,
            state: {
              ...this.props.location.state,
              password
            }
          }}
        />
      )
    }

    return (
      <Layout
        password={password}
        updatePassword={this.updatePassword}
        validatePasswords={this.validatePasswords}
        dataValidation={dataValidation}
        location={this.props.location}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    notifyDeviceUpdated: () => dispatch(actions.notifyDeviceUpdated())
  }
}

export default connect(selector, mapDispatchToProps)(Password)
