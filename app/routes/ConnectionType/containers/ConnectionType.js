import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'

class ConnectionType extends Component {
  constructor(props) {
    super(props)

    this.existsMasterPassword = this.exists2FAAccount()
  }

  exists2FAAccount = () => {
    const { account } = this.props
    if (account.secondFA && Object.keys(account.secondFA).length > 0)
      return true

    return false
  }

  render() {
    return (
      <Layout existsMasterPassword={this.existsMasterPassword} />
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
)(ConnectionType)
