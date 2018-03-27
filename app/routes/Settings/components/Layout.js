import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    return (
      <Page account logOut>
        <Link to='/whitelist'>
          <div className={styles.option}>Manage whitelist</div>
        </Link>
        <Link to='#'>
          <div className={styles.option}>Manage safes</div>
        </Link>
        <Link to='#'>
          <div className={styles.option}>Change master password</div>
        </Link>
      </Page>
    )
  }
}

export default Layout
