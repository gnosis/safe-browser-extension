import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/layout/Page'
import { ACCOUNT_URL } from 'routes/routes'
import styles from 'assets/css/global.css'
import {
  REPLACE_RECOVERY_PRASE,
  REPLACE_RECOVERY_PRASE_EXPLANATION
} from '../../../../../config/messages'

const cx = classNames.bind(styles)

class Layout extends Component {
  render() {
    const { location } = this.props

    return (
      <Page location={location}>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link
              to={ACCOUNT_URL}
              className={cx(styles.btnBack, styles.active)}
            />
            <h2>{REPLACE_RECOVERY_PRASE}</h2>
          </span>
          <div
            className={cx(
              styles.overlayPageContent,
              styles.replaceRecoveryPhraseContent
            )}
          >
            <p>{REPLACE_RECOVERY_PRASE_EXPLANATION}</p>
            <span className={styles.QR}>
              <div id="qr-replace-recovery-phrase" />
            </span>
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
