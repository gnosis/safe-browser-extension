import React, { useState } from 'react'
import classNames from 'classnames/bind'
import SafesMenu from './SafesMenu/containers'
import LockingState from './LockingState/containers'
import NavigationDrawer from './NavigationDrawer'
import styles from './style.css'

const cx = classNames.bind(styles)

const Header = ({ isPopup, location, transactionNumber }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSafes, setShowSafes] = useState(false)

  const toggleMenu = (e) => {
    setShowMenu((showMenu) => !showMenu)
  }

  const toggleSafes = (e) => {
    setShowSafes((showSafe) => !showSafe)
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        {!isPopup && (
          <div
            className={cx(styles.menuTrigger, showMenu ? styles.active : null)}
            onClick={toggleMenu}
          >
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </div>
        )}
        <SafesMenu
          toggleSafes={toggleSafes}
          showSafes={showSafes}
          isPopup={isPopup}
          transactionNumber={transactionNumber}
        />
        <LockingState location={location} isPopup={isPopup} />
      </header>
      {!isPopup && (
        <NavigationDrawer showMenu={showMenu} toggleMenu={toggleMenu} />
      )}
    </React.Fragment>
  )
}

export default Header
