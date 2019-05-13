import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import Layout from '../components/Layout'
import actions from './actions'
import messages from '../../../../../extension/utils/messages'

class LockingConfiguration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minutes: props.account.autoLockInterval
    }
  }

  handleOptionChange = (minutes) => (e) => {
    const { account } = this.props

    let unlockingTime
    if (!account.lockedState) {
      unlockingTime = new Date().toISOString()

      chrome.runtime.sendMessage({
        msg: messages.MSG_CONFIGURE_ACCOUNT_LOCKING
      })
    }
    this.props.onConfigureLocking(minutes, unlockingTime)
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-set-lock-timeout',
      'Set lock timeout: ' + minutes + 'min'
    ])
    this.setState({ minutes })
  }

  render() {
    const { minutes } = this.state

    return (
      <Layout
        minutes={minutes}
        handleOptionChange={this.handleOptionChange}
        location={this.props.location}
      />
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConfigureLocking: (minutes, unlockingTime) =>
      dispatch(actions.configureLocking(minutes, unlockingTime))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LockingConfiguration)
