import React, { Component } from 'react'

import Layout from '../components/Layout'

class CreatePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newPassword: '',
      ready: false
    }
  }

  manageCreatePassword = (newPassword, ready) => {
    this.setState({
      newPassword,
      ready
    })
  }

  render () {
    const { newPassword } = this.state

    return (
      <Layout
        newPassword={newPassword}
        manageCreatePassword={this.manageCreatePassword}
        ready={this.state.ready}
      />
    )
  }
}

export default CreatePassword
