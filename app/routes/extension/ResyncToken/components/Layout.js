import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Button from 'components/layout/Button'
import { ACCOUNT_URL } from 'routes/routes'
import { RESYNC_WITH_MOBILE_APP, SYNC } from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({ handleResync, message, location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <span className={styles.contentHeader}>
        <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
        <h2>{RESYNC_WITH_MOBILE_APP}</h2>
      </span>
      <div className={styles.contentBody}>
        <Button
          className={cx(styles.button, styles.buttonResync)}
          onClick={handleResync()}
        >
          {SYNC}
        </Button>
        <div className={styles.message}>{message && <div>{message}</div>}</div>
      </div>
    </div>
  </Page>
)

export default Layout
