import React, { Component } from 'react'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'

class CreatePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirmPassword: '',
      errorMessage: '',
    }
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  updateConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value })
  }

  validatePasswords = () => {
    const { password, confirmPassword } = this.state

    if (!password || password.length < 10) {
      this.setState({ errorMessage: 'Password too short (min 10 chars)' })
      return false
    }

    if (password !== confirmPassword) {
      this.setState({ errorMessage: 'Passwords don\'t match' })
      return false
    }

    this.setState({ errorMessage: '' })
    return true
  }

  handleCreateAccount = () => {
    if (this.validatePasswords()) {
      this.props.history.push({
        pathname: '/pairing',
        state: {
          connectionType: '2FA',
          masterPassword: this.state.password
        }
      })
    }
  }

  render() {
    const {
      password,
      confirmPassword,
      errorMessage,
    } = this.state

    return (
      <Layout
        password={password}
        confirmPassword={confirmPassword}
        errorMessage={errorMessage}
        updatePassword={this.updatePassword}
        updateConfirmPassword={this.updateConfirmPassword}
        handleCreateAccount={this.handleCreateAccount}
      />
    )
  }
}

export default CreatePassword
