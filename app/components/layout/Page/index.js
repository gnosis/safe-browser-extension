import React from 'react'
import classNames from 'classnames/bind'
import Header from 'components/Headers/CompleteHeader'
import SimpleHeader from 'components/Headers/SimpleHeader'
import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from './style.css'

const cx = classNames.bind(styles)

const getHeader = (withoutHeader, simpleHeader, isPopup, location) => {
  if (withoutHeader) {
    return
  }
  if (simpleHeader) {
    return <SimpleHeader />
  }
  return <Header location={location} isPopup={isPopup} />
}

const Page = ({
  background = 'white',
  withoutHeader,
  simpleHeader,
  children,
  location,
  isPopup
}) => (
  <div className={cx(styles.extension, background)}>
    <div className={styles.extensionInner}>
      {getHeader(withoutHeader, simpleHeader, isPopup, location)}
      {children}
      <NetworkNotification />
    </div>
  </div>
)

export default Page
