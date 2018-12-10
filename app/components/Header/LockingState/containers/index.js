import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'

import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import SafesLocked from '../components/SafesLocked'
import SafesUnlocked from '../components/SafesUnlocked'
import actions from './actions'
import messages from '../../../../../extension/utils/messages'
import { PASSWORD_URL } from 'routes/routes'

class LockingState extends Component {
  constructor (props) {
    super(props)

    this.unlockedAccount(props)

    this.state = {
      lockedAccount: false
    }
  }

  handleLockAccount = () => {
    chrome.runtime.sendMessage({
      msg: messages.MSG_LOCK_ACCOUNT
    })
    ga(['_trackEvent', EXTENSION_SETTINGS, 'click-lock-extension', 'Lock extension'])
  }

  unlockedAccount = (props) => {
    const hasPassword = props && props.location && props.location.state
    if (!hasPassword) {
      return
    }

    const { password } = props.location.state
    const unlockingTime = new Date()
    const encryptedMnemonic = props.account.secondFA.seed
    const mnemonic = CryptoJs.AES.decrypt(
      encryptedMnemonic,
      password
    ).toString(CryptoJs.enc.Utf8)

    this.props.onUnlockAccount(mnemonic, unlockingTime.toISOString())

    chrome.runtime.sendMessage({
      msg: messages.MSG_LOCK_ACCOUNT_TIMER
    })
  }

  handleUnlockAccount = (e) => {
    this.setState({ lockedAccount: true })
    ga(['_trackEvent', EXTENSION_SETTINGS, 'click-unlock-extension', 'Unlock extension'])
  }

  render () {
    const {
      account,
      location
    } = this.props
    const { lockedAccount } = this.state

    if (lockedAccount) {
      const url = {
        pathname: PASSWORD_URL,
        state: {
          dest: location.pathname
        }
      }
      return <Redirect to={url} />
    }
    return (
      account.lockedState
        ? <SafesLocked handleUnlockAccount={this.handleUnlockAccount} />
        : <SafesUnlocked handleLockAccount={this.handleLockAccount} />
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
    onUnlockAccount: (seed, time) => dispatch(actions.unlockAccount(seed, time))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LockingState)
