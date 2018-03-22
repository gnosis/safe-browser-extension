import React, { Component } from 'react'

import Layout from '../components/Layout'

class ConnectionType extends Component {

  handleConnect2FA = (e) => {
    // TO-DO: When multiple safes management is available
    // If master password already exists, push history to '/pairing' with connectionType='2FA'

    this.props.history.push('/create-password')
  }

  handleConnectRelayer = (e) => {
    this.props.history.push({
      pathname: '/pairing',
      state: {connectionType: 'RELAYER'}
    })
  }

  render() {
    return (
      <Layout
        handleConnect2FA={this.handleConnect2FA}
        handleConnectRelayer={this.handleConnectRelayer}
      />
    )
  }
}

export default ConnectionType
