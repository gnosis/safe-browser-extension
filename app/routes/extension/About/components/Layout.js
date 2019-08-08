import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Paragraph from 'components/layout/Paragraph'
import { ACCOUNT_URL } from 'routes/routes'
import {
  ABOUT,
  TERMS_OF_SERVICE,
  PRIVACY_POLICY,
  VERSION
} from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({ versionNumber, location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <span className={styles.contentHeader}>
        <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
        <h2>{ABOUT}</h2>
      </span>
      <div className={styles.contentBody}>
        <div className={styles.about}>
          <Paragraph>
            {VERSION}: {versionNumber}
          </Paragraph>
          <Paragraph>
            <a href="https://safe.gnosis.io/terms" target="_blank">
              {TERMS_OF_SERVICE}
            </a>
          </Paragraph>
          <Paragraph>
            <a href="https://safe.gnosis.io/privacy" target="_blank">
              {PRIVACY_POLICY}
            </a>
          </Paragraph>
        </div>
      </div>
    </div>
  </Page>
)

export default Layout
