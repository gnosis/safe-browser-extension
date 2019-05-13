import React from 'react'
import classNames from 'classnames/bind'

import SafeItem from './SafeItem'
import styles from 'assets/css/global.css'
import { CONNECT_NEW_SAFE } from '../../../../../config/messages'

const cx = classNames.bind(styles)

const Layout = ({
  safes,
  safeAlias,
  showSafes,
  toggleSafes,
  handleAddNewSafe,
  handleSelectSafe,
  handleRemoveSafe,
  isPopup
}) => {
  return (
    <React.Fragment>
      <span
        className={cx(styles.safeIcon, !isPopup && styles.hasMenu)}
        onClick={!isPopup ? toggleSafes : null}
      >
        <i>{safeAlias && safeAlias}</i>
      </span>
      {!isPopup && (
        <React.Fragment>
          <div
            className={cx(
              styles.safeMenuBackground,
              showSafes && styles.active
            )}
            onClick={toggleSafes}
          />
          <span className={cx(styles.safeMenu, showSafes && styles.active)}>
            <ul>
              {safes.safes &&
                safes.safes.map((safe) => (
                  <li
                    className={cx(
                      styles.safeMenuSafeItem,
                      safe.address === safes.currentSafe && styles.active
                    )}
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
                <p>{CONNECT_NEW_SAFE}</p>
              </li>
            </ul>
          </span>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Layout
