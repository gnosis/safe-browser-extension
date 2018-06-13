import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Layout from '../components/Layout'
import actions from './actions'
import { MSG_CONFIGURE_ACCOUNT_LOCKING } from '../../../../extension/utils/messages'

class LockingConfiguration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minutes: props.account.autoLockInterval,
    }
  }

  handleOptionChange = (minutes) => (e) => {
    const { account } = this.props
    this.props.onConfigureLocking(minutes)
    if (!account.lockedState) {
      chrome.runtime.sendMessage({
        msg: MSG_CONFIGURE_ACCOUNT_LOCKING,
      })
    }
    this.setState({ minutes })
  }

  render() {
    const {
      minutes,
    } = this.state

    return (
      <Layout
        minutes={minutes}
        handleOptionChange={this.handleOptionChange}
      />
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConfigureLocking: (minutes) => dispatch(actions.configureLocking(minutes)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LockingConfiguration)
