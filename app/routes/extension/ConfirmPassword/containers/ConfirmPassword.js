import React, { Component } from 'react'
import Layout from '../components/Layout'

class ConfirmPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmPassword: '',
      passwordsMatch: false
    }
  }

  manageConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword,
      passwordsMatch: confirmPassword === this.props.location.state.password
    })
  }

  render() {
    const { confirmPassword, passwordsMatch } = this.state

    return (
      <Layout
        confirmPassword={confirmPassword}
        manageConfirmPassword={this.manageConfirmPassword}
        passwordsMatch={passwordsMatch}
        location={this.props.location}
      />
    )
  }
}

export default ConfirmPassword
