import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Layout from '../components/Layout'
import actions from './actions'

class SafesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectToAccount: false,
    }
  }

  handleSelectSafe = (address) => (e) => {
    this.props.onSelectSafe(address)
    this.setState({ redirectToAccount: true })
  }

  render() {
    const { safes } = this.props
    const { redirectToAccount } = this.state

    if (redirectToAccount) {
      return <Redirect to='/account' />
    }
    return (
      <Layout
        safes={safes}
        selectSafe={this.handleSelectSafe}
      />
    )
  }
}

const mapStateToProps = ({ safes }, props) => {
  return {
    safes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSafe: (address) => dispatch(actions.selectSafe(address))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SafesList)
