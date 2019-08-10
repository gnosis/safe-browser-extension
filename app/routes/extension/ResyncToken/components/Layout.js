import React from 'react'
import Page from 'components/layout/Page'
import Button from 'components/layout/Button'
import ContentHeader from 'components/headers/ContentHeader'
import { ACCOUNT_URL } from 'routes/routes'
import { RESYNC_WITH_MOBILE_APP, SYNC } from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({ handleResync, message, location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <ContentHeader backLink={ACCOUNT_URL} message={RESYNC_WITH_MOBILE_APP} />
      <div className={styles.contentBody}>
        <Button className={styles.button} onClick={handleResync()}>
          {SYNC}
        </Button>
        <div className={styles.message}>{message && <div>{message}</div>}</div>
      </div>
    </div>
  </Page>
)

export default Layout
