import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import SafeItem from './SafeItem'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const Layout = ({
  safes,
  currentAlias,
  showSafes,
  toggleSafes,
  handleSelectSafe,
  handleRemoveSafe,
  noSafeMenu
}) => {
  const addNewSafeUrl = {
    pathname: '/password',
    state: {
      dest: '/download-apps'
    }
  }

  return (
    <React.Fragment>
      <span
        className={cx(styles.safeIcon, !noSafeMenu && styles.hasMenu)}
        onClick={!noSafeMenu ? toggleSafes : null}
      >
        <i>{currentAlias}</i>
      </span>
      {!noSafeMenu &&
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
            <li className={styles.safeMenuNewSafe}>
              <p>
                <Link to={addNewSafeUrl}>
                  Connect to new Safe
                </Link>
              </p>
            </li>
          </ul>
        </span>
      }
    </React.Fragment>
  )
}

export default Layout
