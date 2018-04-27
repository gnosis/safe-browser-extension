import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CryptoJs from 'crypto-js'

import ClearFix from 'components/ClearFix'
import styles from './index.css'
import actions from './actions'

const SafesLocked = () => (
  <div className={styles.lockedAccounts}>
    <div className={styles.state}>Safes are locked</div>
    <Link to={{
      pathname: '/password',
      state: {
        dest: '/account'
      }
    }}>
      <button className={styles.lockingButton}>
        UNLOCK
      </button>
    </Link>
    <ClearFix />
  </div>
)

const SafesUnlocked = ({ handleLockAccount }) => (
  <div className={styles.unlockedAccounts}>
    <div className={styles.state}>Safes are unlocked</div>
    <button
      className={styles.lockingButton}
      onClick={handleLockAccount}
    >
      LOCK
    </button>
    <ClearFix />
  </div>
)

class LockingState extends Component {
  constructor(props) {
    super(props)

    this.handleUnlockAccount(props)
  }

  handleLockAccount = () => {
    this.props.onLockAccount()
  }

  handleUnlockAccount = (props) => {
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
  }

  render() {
    const { account } = this.props

    return (
      <div className={styles.lockedState}>
        {account.lockedState
          ? <SafesLocked />
          : <SafesUnlocked handleLockAccount={this.handleLockAccount} />
        }
      </div>
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
    onLockAccount: () => dispatch(actions.lockAccount()),
    onUnlockAccount: (seed, time) => dispatch(actions.unlockAccount(seed, time))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LockingState)
