import React, { Component } from 'react'

import Layout from '../components/Layout'

class ConfirmPasswordForm extends Component {
  updateConfirmPassword = (e) => {
    this.props.manageConfirmPassword(e.target.value)
  }

  render() {
    const { confirmPassword, passwordsMatch } = this.props

    return (
      <Layout
        confirmPassword={confirmPassword}
        updateConfirmPassword={this.updateConfirmPassword}
        passwordsMatch={passwordsMatch}
      />
    )
  }
}

export default ConfirmPasswordForm
