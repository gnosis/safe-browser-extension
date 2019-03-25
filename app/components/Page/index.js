import React from 'react'
import classNames from 'classnames/bind'

import Header from 'components/Header'
import SimpleHeader from 'components/SimpleHeader'
import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const header = (withoutHeader, simpleHeader, noBorder, location) => {
  if (withoutHeader) {
    return
  }
  if (simpleHeader) {
    return <SimpleHeader noBorder={noBorder} />
  }
  return <Header location={location} />
}

const Page = ({
  page,
  withoutHeader,
  simpleHeader,
  noBorder,
  children,
  location
}) => (
  <div className={cx(styles.extension, page)}>
    <div className={styles.extensionInner}>
      {header(withoutHeader, simpleHeader, noBorder, location)}
      {children}
      <NetworkNotification />
    </div>
  </div>
)

export default Page
