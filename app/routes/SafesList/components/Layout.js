import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      safes,
      selectSafe,
    } = this.props

    return (
      <Page account logOut>
        <Link to='/connection-type'>
          <button>Connect to safe</button>
        </Link>
        {safes.safes && safes.safes.map((safe) => (
          <div
            onClick={selectSafe(safe.address)}
            className={styles.safe}
            key={safe.address}
          >
            <div className={styles.name}>{safe.name}</div>
            <div className={styles.address}>{safe.address}</div>
            <div className={styles.connectionType}>{safe.connectionType}</div>
          </div>
        ))}
      </Page>
    )
  }
}

export default Layout
