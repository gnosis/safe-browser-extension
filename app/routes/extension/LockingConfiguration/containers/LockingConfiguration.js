import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import actions from './actions'
import { MSG_CONFIGURE_ACCOUNT_LOCKING } from '../../../../../extension/utils/messages'

class LockingConfiguration extends Component {
  constructor (props) {
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
        msg: MSG_CONFIGURE_ACCOUNT_LOCKING
      })
    }
    this.props.onConfigureLocking(minutes, unlockingTime)
    this.setState({ minutes })
  }

  render () {
    const {
      minutes
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
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConfigureLocking: (minutes, unlockingTime) => dispatch(actions.configureLocking(minutes, unlockingTime))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LockingConfiguration)
