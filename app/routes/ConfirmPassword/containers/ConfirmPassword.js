import React, { Component } from 'react'

import Layout from '../components/Layout'

class ConfirmPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmPassword: '',
      ready: false,
    }

    this.properties = props.location.state
  }

  manageConfirmPassword = (confirmPassword) => {
    console.log('manageConfirmPassword', confirmPassword, (confirmPassword === this.properties.password))
    this.setState({
      confirmPassword,
      ready: (confirmPassword === this.properties.password),
    })
  }

  render() {
    const { confirmPassword, ready } = this.state

    return (
      <Layout
        confirmPassword={confirmPassword}
        properties={this.properties}
        manageConfirmPassword={this.manageConfirmPassword}
        ready={ready}
      />
    )
  }
}

export default ConfirmPassword
