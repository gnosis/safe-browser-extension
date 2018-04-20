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
      minutes: props.account.lockingConfig
    }
  }

  handleOptionChange = (e) => {
    this.setState({ minutes: parseInt(e.target.value) })
  }

  handleSaveConfig = () => {
    const { account } = this.props
    const { minutes } = this.state

    this.props.onConfigureLocking(minutes)

    if (!account.lockedState) {
      chrome.runtime.sendMessage({
        msg: MSG_CONFIGURE_ACCOUNT_LOCKING,
      })
    }
  }

  render() {
    const { minutes } = this.state

    return (
      <Layout
        minutes={minutes}
        handleOptionChange={this.handleOptionChange}
        handleSaveConfig={this.handleSaveConfig}
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
