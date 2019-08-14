import React from 'react'
import Network from 'react-network'
import Paragraph from 'components/layout/Paragraph'
import {
  INTERNET_CONNECTION_ERROR,
  CHECK_INTERNET_CONNECTION
} from '../../../../config/messages'
import styles from './style.css'

const NotificationMessage = () => (
  <div className={styles.networkNotification}>
    <div>
      <Paragraph>{INTERNET_CONNECTION_ERROR}</Paragraph>
      <Paragraph>{CHECK_INTERNET_CONNECTION}</Paragraph>
    </div>
  </div>
)

const NetworkNotification = ({ children }) => {
  if (!children) {
    children = null
  }

  return (
    <Network
      render={({ online }) => (online ? children : <NotificationMessage />)}
    />
  )
}

export default NetworkNotification
