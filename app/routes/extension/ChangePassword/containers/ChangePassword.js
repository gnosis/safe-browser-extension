import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'
import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import { createEthAccount } from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'
import messages from '../../../../../extension/utils/messages'
import { ACCOUNT_URL } from 'routes/routes'

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newPassword: '',
      confirmPassword: '',
      createPasswordReady: false,
      confirmPasswordReady: false,
      redirectToAccount: false
    }

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.oldPassword = validPassword ? location.state.password : undefined
  }

  manageCreatePassword = (newPassword, createPasswordReady) => {
    const { confirmPassword } = this.state
    this.setState({
      newPassword,
      createPasswordReady,
      confirmPasswordReady:
        newPassword !== '' && newPassword === confirmPassword
    })
  }

  manageConfirmPassword = (confirmPassword) => {
    const { newPassword } = this.state
    this.setState({
      confirmPassword,
      confirmPasswordReady:
        newPassword !== '' && newPassword === confirmPassword
    })
  }

  updateMasterPassword = () => {
    const { selectUnencryptedMnemonic, selectEncryptedMnemonic } = this.props
    const {
      newPassword,
      createPasswordReady,
      confirmPasswordReady
    } = this.state

    if (!createPasswordReady || !confirmPasswordReady) {
      return
    }

    let mnemonic
    if (this.oldPassword && selectEncryptedMnemonic) {
      mnemonic = CryptoJs.AES.decrypt(
        selectEncryptedMnemonic,
        this.oldPassword
      ).toString(CryptoJs.enc.Utf8)
    } else if (selectUnencryptedMnemonic) {
      mnemonic = selectUnencryptedMnemonic
    } else return

    const { encryptedMnemonic, hmac } = createEthAccount(mnemonic, newPassword)

    chrome.runtime.sendMessage({
      msg: messages.MSG_LOCK_ACCOUNT
    })

    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-change-password',
      'Change password'
    ])

    this.props.onUpdateMasterPassword(encryptedMnemonic, hmac)
    this.setState({ redirectToAccount: true })
  }

  render() {
    const {
      newPassword,
      confirmPassword,
      redirectToAccount,
      createPasswordReady,
      confirmPasswordReady
    } = this.state
    if (redirectToAccount) {
      return <Redirect to={ACCOUNT_URL} />
    }
    return (
      <Layout
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        manageCreatePassword={this.manageCreatePassword}
        manageConfirmPassword={this.manageConfirmPassword}
        updateMasterPassword={this.updateMasterPassword}
        confirmPasswordReady={confirmPasswordReady}
        createPasswordReady={createPasswordReady}
        location={this.props.location}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMasterPassword: (encryptedMnemonic, hmac) =>
      dispatch(actions.updateMasterPassword(encryptedMnemonic, hmac))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(ChangePassword)
