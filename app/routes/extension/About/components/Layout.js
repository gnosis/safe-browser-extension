import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Page from 'components/Page'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render () {
    const {
      versionNumber
    } = this.props

    return (
      <Page>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link to='/account' className={cx(styles.btnBack, styles.active)}>
              <p>Back</p>
            </Link>
            <h2>About</h2>
          </span>
          <div className={styles.overlayPageContent}>
            <div className={styles.about}>
              <p>Version: {versionNumber}</p>
              <p><a href='https://safe.gnosis.io/terms' target='_blank'>Terms of Use</a></p>
              <p><a href='https://safe.gnosis.io/privacy' target='_blank'>Privacy Policy</a></p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
