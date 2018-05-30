import React, { Component } from 'react'
import { connect } from 'react-redux'
import CryptoJs from 'crypto-js'
import { Redirect } from 'react-router'

import {
  getDecryptedEthAccount,
  createEthAccount,
} from 'routes/PairingProcess/containers/pairEthAccount'
import actions from './actions'
import Layout from '../components/Layout'
import {
  MSG_LOCK_ACCOUNT,
} from '../../../../extension/utils/messages'

class ConfirmPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      error: {
        match: false,
      },
      continue: false,
      redirectToAccount: false,
    }

    this.properties = props.location.state
  }

  updatePasswordField = (e) => {
    this.setState({ password: e.target.value })
    this.validatePasswords(e.target.value)
  }

  validatePasswords = (newPassword) => {
    const { password } = this.properties

    if (newPassword !== password) {
      this.setState({ continue: false, error: { match: false } })
      return
    }

    this.setState({ continue: true, error: { match: true } })
  }

  updateMasterPassword = () => {
    const { password, oldPassword } = this.properties
    const oldEncryptedMnemonic = this.props.account.secondFA.seed

    const mnemonic = CryptoJs.AES.decrypt(
      oldEncryptedMnemonic,
      oldPassword,
    ).toString(CryptoJs.enc.Utf8)

    const { encryptedMnemonic, hmac } = createEthAccount(mnemonic, password)

    chrome.runtime.sendMessage({
      msg: MSG_LOCK_ACCOUNT,
    })

    this.props.onUpdateMasterPassword(encryptedMnemonic, hmac)
    this.setState({ redirectToAccount: true })
  }

  render() {
    const {
      password,
      confirmPassword,
      error,
      redirectToAccount,
    } = this.state

    if (redirectToAccount) {
      return <Redirect to='/account' />
    }
    return (
      <Layout
        password={password}
        error={error}
        updatePasswordField={this.updatePasswordField}
        updateMasterPassword={this.updateMasterPassword}
        properties={this.properties}
        continue={this.state.continue}
      />
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMasterPassword: (encryptedMnemonic, hmac) => dispatch(actions.updateMasterPassword(encryptedMnemonic, hmac)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmPassword)
