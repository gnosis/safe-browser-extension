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
  REPLACE_RECOVERY_PHRASE_URL,
  PAYMENT_TOKEN_URL
} from 'routes/routes'
import { getNetwork } from '../../../../config'
import { MAINNET } from '../../../../config/names'
import {
  MANAGE_SITES_WHITELIST,
  SET_LOCK_TIMEOUT,
  CHANGE_PASSWORD,
  RESYNC_WITH_MOBILE_APP,
  ABOUT,
  REPLACE_RECOVERY_PRASE,
  PAYMENT_TOKEN
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
      toggleMenu,
      transactions
    } = this.props

    const changePasswordUrl = this.passwordProtection(CHANGE_PASSWORD_URL)
    const resyncTokenUrl = this.passwordProtection(RESYNC_TOKEN_URL)
    const replaceRecoveryPhraseUrl = this.passwordProtection(REPLACE_RECOVERY_PHRASE_URL)

    const paymentTokenDetail = transactions.paymentToken && transactions.paymentToken.symbol
      ? transactions.paymentToken.symbol.toUpperCase() + ' (' + transactions.paymentToken.name + ')'
      : 'ETH (Ether)'

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
            <Link to={PAYMENT_TOKEN_URL}>
              <div data-menu='payment-token'>
                <div className={styles.descriptiveMenuEntry}>
                  <div>{PAYMENT_TOKEN}</div>
                  <div className={styles.token}>{paymentTokenDetail}</div>
                </div>
              </div>
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

const mapStateToProps = ({ account, transactions }, props) => {
  return {
    account,
    transactions
  }
}

export default connect(
  mapStateToProps
)(NavigationDrawer)
