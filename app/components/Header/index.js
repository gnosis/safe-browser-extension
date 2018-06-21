import React, { Component } from 'react'
import classNames from 'classnames/bind'

import SafesMenu from './SafesMenu/containers'
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
          <SafesMenu
            toggleSafes={this.toggleSafes}
            showSafes={showSafes}
          />
          <LockingState properties={this.props.properties} />
        </header>
        <NavigationDrawer showMenu={showMenu} />
      </React.Fragment>
    )
  }
}

export default Header
