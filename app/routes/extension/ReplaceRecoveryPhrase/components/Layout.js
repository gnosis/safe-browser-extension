import React from 'react'
import Page from 'components/layout/Page'
import { ACCOUNT_URL } from 'routes/routes'
import ContentHeader from 'components/headers/ContentHeader'
import {
  REPLACE_RECOVERY_PRASE,
  REPLACE_RECOVERY_PRASE_EXPLANATION
} from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({ location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <ContentHeader backLink={ACCOUNT_URL} message={REPLACE_RECOVERY_PRASE} />
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
