import React, { Component } from 'react'

import Layout from '../components/Layout'

class ConfirmPasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  updateConfirmPassword = (e) => {
    this.props.manageConfirmPassword(e.target.value)
  }

  render() {
    const {
      confirmPassword,
      ready,
    } = this.props

    return (
      <Layout
        confirmPassword={confirmPassword}
        updateConfirmPassword={this.updateConfirmPassword}
        ready={ready}
      />
    )
  }
}

export default ConfirmPasswordForm
