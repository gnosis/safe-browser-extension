import React from 'react'
import classNames from 'classnames/bind'

import SafeItem from './SafeItem'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const Layout = ({
  safes,
  safeAlias,
  showSafes,
  toggleSafes,
  handleAddNewSafe,
  handleSelectSafe,
  handleRemoveSafe,
  showingTransaction
}) => {
  return (
    <React.Fragment>
      <span
        className={cx(styles.safeIcon, !showingTransaction && styles.hasMenu)}
        onClick={!showingTransaction ? toggleSafes : null}
      >
        <i>{safeAlias && safeAlias}</i>
      </span>
      {!showingTransaction &&
        <React.Fragment>
          <div
            className={cx(styles.safeMenuBackground, showSafes && styles.active)}
            onClick={toggleSafes}
          />
          <span className={cx(styles.safeMenu, showSafes && styles.active)}>
            <ul>
              {safes.safes && safes.safes.map((safe) => (
                <li
                  className={cx(styles.safeMenuSafeItem, (safe.address === safes.currentSafe) && styles.active)}
                  onClick={handleSelectSafe(safe.address)}
                  key={safe.address}
                >
                  <SafeItem
                    address={safe.address}
                    alias={safe.alias}
                    removeSafe={handleRemoveSafe}
                  />
                </li>
              ))}
              <li className={styles.safeMenuNewSafe} onClick={handleAddNewSafe}>
                <p>Connect to new Safe</p>
              </li>
            </ul>
          </span>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Layout
