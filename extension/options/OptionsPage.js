import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from '../../app/assets/css/global.css'
import notificationsImage from '../../app/assets/images/notifications_setting.svg'
import { getNetwork } from '../../config'
import {
  OPTIONS_PAGE_HEADER,
  OPTIONS_PAGE_DESCRIPTION,
  ALLOW_NOTIFICATIONS,
  PERSONAL_EDITION
} from '../../config/messages'

const cx = classNames.bind(styles)

class OptionsPage extends Component {
  componentDidMount = () => {
    // var message = document.getElementById('message')
    var notificationsButton = document.getElementById('requestNotitications')

    navigator.permissions
      .query({ name: 'notifications' })
      .then(function(permission) {
        switch (permission.state) {
          case 'granted':
            notificationsButton.style.display = 'none'
            // message.innerHTML = 'Notifications are allowed'
            break

          case 'denied':
            // message.innerHTML = 'You need to allow notifications'
            break

          case 'prompt':
            notificationsButton.style.display = 'block'
            // message.innerHTML = 'You need to allow notifications'

            notificationsButton.addEventListener('click', function() {
              // eslint-disable-next-line
              Notification.requestPermission()
                .then(function(permission) {
                  if (permission === 'granted') {
                    window.close()
                  }
                  if (permission === 'denied') {
                    notificationsButton.style.display = 'none'
                  }
                })
                .catch(function(err) {
                  console.error(err)
                })
            })
            break
        }
      })
  }

  render() {
    return (
      <div className={styles.start}>
        <div className={styles.content}>
          <span className={styles.safeLogo} data-network={getNetwork()}>
            <span className={styles.edition}>{PERSONAL_EDITION}</span>
          </span>
          <h1>{OPTIONS_PAGE_HEADER}</h1>
          <p>{OPTIONS_PAGE_DESCRIPTION}</p>
          <img src={notificationsImage} height="134" width="170" />
          <button className={styles.button} id="requestNotitications">
            {ALLOW_NOTIFICATIONS}
          </button>
        </div>
      </div>
    )
  }
}

export default OptionsPage
