import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'

class Password extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      errorMessage: '',
      continue: false,
    }

    this.properties = props.location.state
  }

  updatePassword = (e) => {
    const currentPassword = e.target.value
    this.setState({ password: currentPassword })
  }

  validatePasswords = () => {
    const { password } = this.state
    const { account } = this.props

    if (!password) {
      this.setState({ errorMessage: 'Invalid password' })
      return false
    }

    const encryptedSeed = account.secondFA.seed
    const decryptedHmac = CryptoJs.HmacSHA256(encryptedSeed, CryptoJs.SHA256(password)).toString()

    if (decryptedHmac === account.secondFA.hmac) {
      this.setState({ continue: true })
    }
    this.setState({ errorMessage: 'Wrong password' })
  }

  render() {
    const { password, errorMessage } = this.state
    const { dest, option } = this.properties

    let state
    if (this.state.continue) {
      if (option === 'updatePassword') {
        state = {
          option,
          oldPassword: password,
        }
      }
      else {
        state = {
          option,
          password,
        }
      }
      return <Redirect to={{
        pathname: dest,
        state,
      }} />
    }

    return (
      <Layout
        password={password}
        errorMessage={errorMessage}
        updatePassword={this.updatePassword}
        validatePasswords={this.validatePasswords}
      />
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account
  }
}

export default connect(
  mapStateToProps,
)(Password)
