import React from 'react'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Paragraph from 'components/layout/Paragraph'
import PairingProcess from './PairingProcess/containers/PairingProcess'
import googlePlayBadge from '../assets/google_play_badge.svg'
import appStoreBadge from '../assets/app_store_badge.svg'
import {
  CONNECTED_EXTENSION_SUCCESFULLY,
  DOWNLOAD_MOBILE_APP,
  CONNECT_EXTENSION_EXPLANATION
} from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({
  password,
  location,
  openGooglePlay,
  openAppStore,
  iosAppUrl
}) => (
  <Page location={location} simpleHeader background="grey">
    <div className={styles.content}>
      <h1>{CONNECTED_EXTENSION_SUCCESFULLY}</h1>
      <div className={styles.innerContent}>
        <Paragraph className={styles.step}>{DOWNLOAD_MOBILE_APP}</Paragraph>
        <div className={styles.appStores}>
          {iosAppUrl && (
            <img
              src={appStoreBadge}
              onClick={openAppStore}
              height="40"
              width="135"
            />
          )}
          <img
            src={googlePlayBadge}
            onClick={openGooglePlay}
            height="40"
            width="135"
          />
        </div>
        <Paragraph className={cx(styles.step, styles.step2)}>
          {CONNECT_EXTENSION_EXPLANATION}
        </Paragraph>
        <PairingProcess password={password} />
      </div>
    </div>
  </Page>
)

export default Layout
