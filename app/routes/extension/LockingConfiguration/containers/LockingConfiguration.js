import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import Layout from '../components/Layout'
import actions from './actions'
import messages from '../../../../../extension/utils/messages'

const LockingConfiguration = ({ account, onConfigureLocking, location }) => {
  const [minutes, setMinutes] = useState(account.autoLockInterval)

  const handleOptionChange = (minutes) => (e) => {
    let unlockingTime
    if (!account.lockedState) {
      unlockingTime = new Date().toISOString()

      chrome.runtime.sendMessage({
        msg: messages.MSG_CONFIGURE_ACCOUNT_LOCKING
      })
    }
    onConfigureLocking(minutes, unlockingTime)
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-set-lock-timeout',
      'Set lock timeout: ' + minutes + 'min'
    ])
    setMinutes(minutes)
  }

  return (
    <Layout
      minutes={minutes}
      handleOptionChange={handleOptionChange}
      location={location}
    />
  )
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
