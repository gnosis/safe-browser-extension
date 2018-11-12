import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Page from 'components/Page'
import { ACCOUNT_URL } from 'routes/routes'
import styles from 'assets/css/global.css'
import {
  ABOUT,
  BACK,
  TERMS_OF_SERVICE,
  PRIVACY_POLICY,
  VERSION
} from '../../../../../config/messages'

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
            <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)}>
              <p>{BACK}</p>
            </Link>
            <h2>{ABOUT}</h2>
          </span>
          <div className={styles.overlayPageContent}>
            <div className={styles.about}>
              <p>{VERSION}: {versionNumber}</p>
              <p><a href='https://safe.gnosis.io/terms' target='_blank'>{TERMS_OF_SERVICE}</a></p>
              <p><a href='https://safe.gnosis.io/privacy' target='_blank'>{PRIVACY_POLICY}</a></p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
