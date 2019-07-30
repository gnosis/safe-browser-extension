import React from 'react'
import classNames from 'classnames/bind'
import Header from 'components/Headers/CompleteHeader'
import SimpleHeader from 'components/Headers/SimpleHeader'
import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from './style.css'

const cx = classNames.bind(styles)

const getHeader = (withoutHeader, simpleHeader, location) => {
  if (withoutHeader) {
    return
  }
  if (simpleHeader) {
    return <SimpleHeader />
  }
  return <Header location={location} />
}

const Page = ({
  background = 'white',
  withoutHeader,
  simpleHeader,
  children,
  location
}) => (
  <div className={cx(styles.extension, background)}>
    <div className={styles.extensionInner}>
      {getHeader(withoutHeader, simpleHeader, location)}
      {children}
      <NetworkNotification />
    </div>
  </div>
)

export default Page
