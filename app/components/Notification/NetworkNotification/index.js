import React from 'react'
import Network from 'react-network'

import styles from 'assets/css/global.css'
import {
  INTERNET_CONNECTION_ERROR,
  CHECK_INTERNET_CONNECTION
} from '../../../../config/messages'

const NotificationMessage = () => (
  <div className={styles.networkNotification}>
    <div>
      <p>{INTERNET_CONNECTION_ERROR}</p>
      <p>{CHECK_INTERNET_CONNECTION}</p>
    </div>
  </div>
)

const NetworkNotification = ({
  children
}) => {
  if (!children) children = null

  return (
    <Network
      render={({ online }) => online
        ? children
        : <NotificationMessage />
      }
    />
  )
}

export default NetworkNotification
