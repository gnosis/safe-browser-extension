import React, { Component } from 'react'
import classNames from 'classnames/bind'

import SafeItem from './SafeItem'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSafes: false,
      showMenu: false,
    }
  }

  toggleMenu = () => {
    const { showMenu } = this.state
    this.setState({ showMenu: !showMenu })
  }

  toggleSafes = () => {
    const { showSafes } = this.state
    this.setState({ showSafes: !showSafes })
  }

  render() {
    const {
      showMenu,
      showSafes,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <div className={cx(styles.menuTrigger, showMenu ? styles.active : null)} onClick={this.toggleMenu}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
          <span
            className={cx(styles.safeIcon, styles.hasMenu)}
            onClick={this.toggleSafes}
          >
            <i>Tobias Funds</i>
          </span>
          <span className={cx(styles.safeMenu, showSafes ? styles.active : null)}>
            <ul>
              <li className={cx(styles.safeMenuSafeItem, styles.active)}>
                <SafeItem />
              </li>
              <li className={styles.safeMenuSafeItem}>
                <SafeItem />
              </li>
              <li className={styles.safeMenuNewSafe}>
                <p>Connect to new Safe</p>
              </li>
            </ul>
          </span>
          <span className={styles.lockedState} data-locked='true' data-timeout='1m 50s'></span>
        </header>
        <ul className={cx(styles.safeDrawerMenu, showMenu ? styles.active : null)}>
          <li data-menu='whitelist'>Manage sites whitelist</li>
          <li data-menu='timeout'>Set lock timeout</li>
          <li data-menu='password'>Change password</li>
        </ul>
      </React.Fragment>
    )
  }
}

export default Header
