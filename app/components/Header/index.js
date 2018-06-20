import React, { Component } from 'react'
import classNames from 'classnames/bind'

import SafeItem from './SafeItem'
import LockingState from './LockingState/containers'
import NavigationDrawer from './NavigationDrawer'
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
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }))
  }

  toggleSafes = () => {
    this.setState((prevState) => ({
      showSafes: !prevState.showSafes
    }))
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
          <LockingState properties={this.props.properties} />
        </header>
        <NavigationDrawer showMenu={showMenu} />
      </React.Fragment>
    )
  }
}

export default Header
