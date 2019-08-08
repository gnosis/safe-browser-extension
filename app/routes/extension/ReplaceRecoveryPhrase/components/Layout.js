import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import { ACCOUNT_URL } from 'routes/routes'
import {
  REPLACE_RECOVERY_PRASE,
  REPLACE_RECOVERY_PRASE_EXPLANATION
} from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({ location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <span className={styles.contentHeader}>
        <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
        <h2>{REPLACE_RECOVERY_PRASE}</h2>
      </span>
      <div className={styles.innerContent}>
        <h1>{REPLACE_RECOVERY_PRASE_EXPLANATION}</h1>
        <span className={styles.QR}>
          <div id="qr-replace-recovery-phrase" />
        </span>
      </div>
    </div>
  </Page>
)

export default Layout
