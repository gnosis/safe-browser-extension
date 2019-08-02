import React from 'react'
import Page from 'components/layout/Page'
import Paragraph from 'components/layout/Paragraph'
import Link from 'components/layout/Link'
import Button from 'components/layout/Button'
import Blockie from 'components/Blockie'
import WhitelistedDappState from './WhitelistedDappState/containers'
import {
  VIEW_ON_ETHERSCAN,
  CONNECT_NEW_SAFE
} from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({
  currentSafe,
  currentSafeAlias,
  location,
  openEtherScan,
  pairingUrl
}) => (
  <Page location={location} background="grey">
    <div className={styles.content}>
      <WhitelistedDappState />
      <div className={styles.innerContent}>
        <Blockie address={currentSafe} diameter={44} />
        <h1 className={styles.safeAddressAlias}>{currentSafeAlias}</h1>
        <Paragraph className={styles.safeAddress}>{currentSafe}</Paragraph>
      </div>
      <Link to="#" className={styles.link} onClick={openEtherScan} externalLink>
        {VIEW_ON_ETHERSCAN}
      </Link>
      <Link to={pairingUrl} className={styles.link}>
        <Button className={styles.button}>{CONNECT_NEW_SAFE}</Button>
      </Link>
    </div>
  </Page>
)

export default Layout
