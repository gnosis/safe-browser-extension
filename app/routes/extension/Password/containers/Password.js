import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'

class Password extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      errorMessage: '',
      continue: false,
      dataValidation: '',
      rotation: { 'transform': 'rotate(0deg)' }
    }

    this.properties = props.location.state
  }

  updatePassword = (e) => {
    const currentPassword = e.target.value
    const rotateRandom = [15, 30, -45, 120, 230, -10]
    const rotation = {
      'transform': 'rotate(' + rotateRandom[Math.floor(Math.random() * rotateRandom.length)] + 'deg)'
    }

    this.setState({
      password: currentPassword,
      rotation
    })
  }

  validatePasswords = () => {
    const { password } = this.state
    const { account } = this.props
    const encryptedSeed = account.secondFA.seed
    const decryptedHmac = CryptoJs.HmacSHA256(encryptedSeed, CryptoJs.SHA256(password)).toString()

    if (decryptedHmac === account.secondFA.hmac) {
      this.setState({ dataValidation: 'OK' })
      setTimeout(() => {
        this.setState({ continue: true })
      }, 500)
      return
    }

    this.setState({ dataValidation: 'ERROR' })
    setTimeout(() => {
      this.setState({ dataValidation: '' })
    }, 500)
  }

  render () {
    const {
      password,
      rotation,
      dataValidation
    } = this.state

    if (this.state.continue) {
      return <Redirect to={{
        pathname: this.properties.dest,
        state: {
          ...this.properties,
          password
        }
      }} />
    }

    return (
      <Layout
        password={password}
        updatePassword={this.updatePassword}
        validatePasswords={this.validatePasswords}
        dataValidation={dataValidation}
        rotation={rotation}
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
  mapStateToProps
)(Password)
