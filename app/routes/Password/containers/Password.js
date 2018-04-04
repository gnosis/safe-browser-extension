import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      this.setState({ errorMessage: 'CORRECT PASSWORD' })
      this.setState({ continue: true })
    }
    this.setState({ errorMessage: 'Wrong password' })
  }

  render() {
    const {
      password,
      errorMessage
    } = this.state

    return (
      <Layout
        password={password}
        errorMessage={errorMessage}
        continue={this.state.continue}
        updatePassword={this.updatePassword}
        validatePasswords={this.validatePasswords}
        properties={this.properties}
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
