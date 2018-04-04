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
    if (account)
      if (account.secondFA)
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
