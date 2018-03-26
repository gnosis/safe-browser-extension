import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'

class ConnectionType extends Component {
  constructor(props) {
    super(props)

    this.existsMasterPassword = this.existsAccount()
  }

  existsAccount = () => {
    const { account } = this.props
    if (account)
      return (Object.keys(account).length !== 0)
    else
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
