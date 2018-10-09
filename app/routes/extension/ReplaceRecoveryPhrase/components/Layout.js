import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Page from 'components/Page'
import { ACCOUNT_URL } from 'routes/routes'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render () {
    return (
      <Page>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)}>
              <p>Back</p>
            </Link>
            <h2>Replace recovery phrase</h2>
          </span>
          <div className={styles.overlayPageContent}>
            <div className={styles.safeContent}>
              <span className={styles.QR}>
                <div id='qr-replace-recovery-phrase' />
              </span>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
