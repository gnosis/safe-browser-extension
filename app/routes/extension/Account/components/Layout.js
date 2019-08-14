import React from 'react'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Paragraph from 'components/layout/Paragraph'
import Link from 'components/layout/Link'
import Button from 'components/layout/Button'
import Blockie from 'components/Blockie'
import WhitelistedDappState from './WhitelistedDappState/containers'
import {
  VIEW_ON_ETHERSCAN,
  CONNECT_NEW_SAFE,
  COPIED_TO_CLIPBOARD
} from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({
  currentSafe,
  currentSafeAlias,
  location,
  handleOpenEtherScan,
  handleAddNewSafe,
  copyCurrentSafe,
  showClipboard
}) => (
  <Page location={location} background="grey">
    <div className={styles.content}>
      <WhitelistedDappState />
      <div className={styles.innerContent}>
        <Blockie address={currentSafe} diameter={44} />
        <h1>{currentSafeAlias}</h1>
        <Paragraph id="safeAddress" className={styles.safeAddress} onClick={copyCurrentSafe}>
          {currentSafe}
        </Paragraph>
        <div className={cx(styles.clipboardWrapper, showClipboard && styles.show)}>
          <span className={styles.clipboard}>{COPIED_TO_CLIPBOARD}</span>
        </div>
      </div>
      <Link
        to="#"
        className={styles.link}
        onClick={handleOpenEtherScan}
        externalLink
      >
        {VIEW_ON_ETHERSCAN}
      </Link>
      <Button onClick={handleAddNewSafe} className={styles.button}>
        {CONNECT_NEW_SAFE}
      </Button>
    </div>
  </Page>
)

export default Layout
