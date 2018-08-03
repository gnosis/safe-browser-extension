import React, { Component } from 'react'
import Network from 'react-network'

import styles from 'assets/css/global.css'

class NetworkNotification extends Component {
  render () {
    return (
      <Network
        render={({ online }) => (
          !online &&
          <div className={styles.networkNotification}>
            <div>
              <p>Unable to connect with internet.</p>
              <p>Please check your connection!</p>
            </div>
          </div>
        )}
      />
    )
  }
}

export default NetworkNotification
