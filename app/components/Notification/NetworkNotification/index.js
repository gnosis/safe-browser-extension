import React from 'react'
import Network from 'react-network'

import styles from 'assets/css/global.css'

const NotificationMessage = () => (
  <div className={styles.networkNotification}>
    <div>
      <p>Unable to connect with internet.</p>
      <p>Please check your connection!</p>
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
