import React, { Component } from 'react'

import Layout from '../components/Layout'

class ConfirmPassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      confirmPassword: '',
      passwordsMatch: false
    }

    this.properties = props.location.state
  }

  manageConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword,
      passwordsMatch: (confirmPassword === this.properties.password)
    })
  }

  render () {
    const {
      confirmPassword,
      passwordsMatch
    } = this.state

    return (
      <Layout
        confirmPassword={confirmPassword}
        properties={this.properties}
        manageConfirmPassword={this.manageConfirmPassword}
        passwordsMatch={passwordsMatch}
      />
    )
  }
}

export default ConfirmPassword
