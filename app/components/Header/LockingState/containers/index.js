import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'

import SafesLocked from '../components/SafesLocked'
import SafesUnlocked from '../components/SafesUnlocked'

import styles from 'assets/css/global.css'
import actions from './actions'
import {
  MSG_LOCK_ACCOUNT,
  MSG_LOCK_ACCOUNT_TIMER,
} from '../../../../../extension/utils/messages'

class LockingState extends Component {
  constructor(props) {
    super(props)

    this.unlockedAccount(props)

    this.state = {
      lockedAccount: false,
    }
  }

  handleLockAccount = () => {
    chrome.runtime.sendMessage({
      msg: MSG_LOCK_ACCOUNT,
    })
  }

  unlockedAccount = (props) => {
    const hasPassword = props && props.properties && props.properties.state
    if (!hasPassword)
      return

    const { password } = props.properties.state
    const unlockingTime = new Date()
    const encryptedMnemonic = props.account.secondFA.seed
    const mnemonic = CryptoJs.AES.decrypt(
      encryptedMnemonic,
      password,
    ).toString(CryptoJs.enc.Utf8)

    this.props.onUnlockAccount(mnemonic, unlockingTime.toISOString())

    chrome.runtime.sendMessage({
      msg: MSG_LOCK_ACCOUNT_TIMER,
    })
  }

  handleUnlockAccount = (e) => {
    this.setState({ lockedAccount: true })
  }

  render() {
    const {
      account,
      txReview,
    } = this.props
    const { lockedAccount } = this.state

    if (lockedAccount) {
      const url = {
        pathname: '/password',
        state: {
          dest: (txReview) ? '/transaction' : '/account'
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
    account,
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
