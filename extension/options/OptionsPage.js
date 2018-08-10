import React, { Component } from 'react'
import classNames from 'classnames/bind'

import styles from '../../app/assets/css/global.css'
import notificationsImage from '../../app/assets/images/notifications_setting.svg'

const cx = classNames.bind(styles)

class OptionsPage extends Component {
  componentDidMount = async () => {
    // var message = document.getElementById('message')
    var notificationsButton = document.getElementById('requestNotitications')

    try {
      const permission = await navigator.permissions.query({ name: 'notifications' })
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

          notificationsButton.addEventListener('click', async () => {
            try {
              // eslint-disable-next-line
              const permission = await Notification.requestPermission()
              if (permission === 'granted') {
                window.close()
              } else if (permission === 'denied') {
                notificationsButton.style.display = 'none'
              }
            } catch (err) {
              console.error(err)
            }
          })
          break
      }
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    return (
      <div className={styles.start}>
        <div className={styles.content}>
          <span className={styles.safeLogo} data-network='rinkeby' />
          <h1>Thank you for installing<br />the Gnosis Safe browser extension!</h1>
          <p>To use the Safe extension you first need to allow notifications. They are used to notify you about transactions sent from the Gnosis Safe mobile app.</p>
          <img src={notificationsImage} height='134' width='170' />
          <button className={cx(styles.button, styles.round)} id='requestNotitications'>Allow notifications</button>
        </div>
      </div>
    )
  }
}

export default OptionsPage
