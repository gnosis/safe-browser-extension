import React, { Component } from 'react'
import classNames from 'classnames/bind'

import SafesMenu from './SafesMenu/containers'
import LockingState from './LockingState/containers'
import NavigationDrawer from './NavigationDrawer'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showSafes: false,
      showMenu: false
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

  render () {
    const {
      showMenu,
      showSafes
    } = this.state
    const {
      txReview,
      transactionNumber
    } = this.props

    return (
      <React.Fragment>
        <header>
          {!txReview &&
            <div
              className={cx(styles.menuTrigger, showMenu ? styles.active : null)}
              onClick={this.toggleMenu}
            >
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={styles.line} />
            </div>
          }
          <SafesMenu
            toggleSafes={this.toggleSafes}
            showSafes={showSafes}
            showingTransaction={txReview}
            transactionNumber={transactionNumber}
          />
          <LockingState
            txReview={txReview}
            properties={this.props.properties}
          />
        </header>
        {!txReview &&
          <NavigationDrawer showMenu={showMenu} />
        }
      </React.Fragment>
    )
  }
}

export default Header
