import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'
import {
  PASSWORD_URL,
  CHANGE_PASSWORD_URL,
  RESYNC_TOKEN_URL,
  WHITELIST_URL,
  LOCKING_URL,
  ABOUT_URL,
  REPLACE_RECOVERY_PHRASE_URL
} from 'routes/routes'

const cx = classNames.bind(styles)

class NavigationDrawer extends Component {
  passwordProtection = (url) => {
    const { account } = this.props
    const protectedUrl = account.lockedState
      ? {
        pathname: PASSWORD_URL,
        state: {
          dest: url
        }
      }
      : url
    return protectedUrl
  }

  render () {
    const { showMenu } = this.props

    const changePasswordUrl = this.passwordProtection(CHANGE_PASSWORD_URL)
    const resyncTokenUrl = this.passwordProtection(RESYNC_TOKEN_URL)
    const replaceRecoveryPhraseUrl = this.passwordProtection(REPLACE_RECOVERY_PHRASE_URL)
    return (
      <ul className={cx(styles.safeDrawerMenu, showMenu && styles.active)}>
        <li data-menu='whitelist'>
          <Link to={WHITELIST_URL}>Manage sites whitelist</Link>
        </li>
        <li data-menu='timeout'>
          <Link to={LOCKING_URL}>Set lock timeout</Link>
        </li>
        <li data-menu='password'>
          <Link to={changePasswordUrl}>Change password</Link>
        </li>
        <li data-menu='resync'>
          <Link to={resyncTokenUrl}>Resync push token</Link>
        </li>
        <li data-menu='replace-recovery-phrase'>
          <Link to={replaceRecoveryPhraseUrl}>Replace recovery phrase</Link>
        </li>
        <li data-menu='about'>
          <Link to={ABOUT_URL}>About</Link>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account
  }
}

export default connect(
  mapStateToProps
)(NavigationDrawer)
