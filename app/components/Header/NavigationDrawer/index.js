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
import {
  MANAGE_SITES_WHITELIST,
  SET_LOCK_TIMEOUT,
  CHANGE_PASSWORD,
  RESYNC_WITH_MOBILE_APP,
  ABOUT,
  REPLACE_RECOVERY_PRASE
} from '../../../../config/messages'

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
              <div data-menu='whitelist'>{MANAGE_SITES_WHITELIST}</div>
            </Link>
          </li>
          <li>
            <Link to={LOCKING_URL}>
              <div data-menu='timeout'>{SET_LOCK_TIMEOUT}</div>
            </Link>
          </li>
          <li>
            <Link to={changePasswordUrl}>
              <div data-menu='password'>{CHANGE_PASSWORD}</div>
            </Link>
          </li>
          <li>
            <Link to={resyncTokenUrl}>
              <div data-menu='resync'>{RESYNC_WITH_MOBILE_APP}</div>
            </Link>
          </li>
          <li>
            <Link to={replaceRecoveryPhraseUrl}>
              <div data-menu='replace-recovery-phrase'>{REPLACE_RECOVERY_PRASE}</div>
            </Link>
          </li>
          <li>
            <Link to={ABOUT_URL}>
              <div data-menu='about'>{ABOUT}</div>
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
