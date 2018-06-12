import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import selector from './selector'

class Settings extends Component {
  render() {
    const { hasLockedAccount } = this.props
    return (
      <Layout hasLockedAccount={hasLockedAccount} />
    )
  }
}

export default connect(
  selector
)(Settings)
