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
    const {
      showMenu,
      toggleMenu
    } = this.props

    const changePasswordUrl = this.passwordProtection(CHANGE_PASSWORD_URL)
    const resyncTokenUrl = this.passwordProtection(RESYNC_TOKEN_URL)
    const replaceRecoveryPhraseUrl = this.passwordProtection(REPLACE_RECOVERY_PHRASE_URL)
    return (
      <React.Fragment>
        <div
          className={cx(styles.safeDrawerMenuBackground, showMenu && styles.active)}
          onClick={toggleMenu}
        />
        <ul className={cx(styles.safeDrawerMenu, showMenu && styles.active)}>
          <li>
            <Link to={WHITELIST_URL}>
              <div data-menu='whitelist'>Manage sites whitelist</div>
            </Link>
          </li>
          <li>
            <Link to={LOCKING_URL}>
              <div data-menu='timeout'>Set lock timeout</div>
            </Link>
          </li>
          <li>
            <Link to={changePasswordUrl}>
              <div data-menu='password'>Change password</div>
            </Link>
          </li>
          <li>
            <Link to={resyncTokenUrl}>
              <div data-menu='resync'>Resync with mobile app</div>
            </Link>
          </li>
          <li>
            <Link to={replaceRecoveryPhraseUrl}>
              <div data-menu='replace-recovery-phrase'>Replace recovery phrase</div>
            </Link>
          </li>
          <li>
            <Link to={ABOUT_URL}>
              <div data-menu='about'>About</div>
            </Link>
          </li>
        </ul>
      </React.Fragment>
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
