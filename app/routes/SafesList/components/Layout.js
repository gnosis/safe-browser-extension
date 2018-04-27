import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      safes,
      selectSafe,
      lockedState,
    } = this.props
    const passwordRoute = {
      pathname: '/password',
      state: {
        dest: '/pairing'
      }
    }
    const pairingRoute = '/pairing'

    return (
      <Page account logOut padding='noPadding'>
        <div className={styles.innerPage}>
          <Link to={lockedState ? passwordRoute : pairingRoute}>
            <button className={styles.button}>Connect to safe</button>
          </Link>
        </div>
        {safes.safes && safes.safes.map((safe) => (
          <div
            onClick={selectSafe(safe.address)}
            className={styles.safe}
            key={safe.address}
          >
            <div className={styles.name}>{safe.name}</div>
            <div className={styles.address}>{safe.address}</div>
          </div>
        ))}
      </Page>
    )
  }
}

export default Layout
