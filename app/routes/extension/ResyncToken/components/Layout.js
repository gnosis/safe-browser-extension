import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import styles from 'assets/css/global.css'
import { ACCOUNT_URL } from 'routes/routes'
import { SYNC } from '../../../../../config/messages'

const cx = classNames.bind(styles)

class Layout extends Component {
  render () {
    const { handleResync } = this.props

    return (
      <Page>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
          </span>
          <button
            className={cx(styles.button, styles.buttonResync)}
            onClick={handleResync()}
          >
            {SYNC}
          </button>
        </div>
      </Page>
    )
  }
}

export default Layout
