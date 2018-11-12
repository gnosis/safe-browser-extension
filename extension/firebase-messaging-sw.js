/* eslint-env serviceworker */
import { getNetwork } from '../config'
import { MAINNET } from '../config/names'
import notificationImage from 'assets/images/notification_image.jpg'
import {
  SAFE_CREATED,
  SAFE_CREATION,
  CONFIRM_TRANSACTION,
  CONFIRMATION_REQUEST,
  TRANSACTION_SUBMITTED,
  TRANSACTION_REJECTED
} from '../config/messages'

self.addEventListener('push', (event) => {
  const payload = event.data.json().data

  let title, message, url
  switch (payload.type) {
    case 'safeCreation':
      title = SAFE_CREATION
      message = SAFE_CREATED
      url = null
      break

    case 'requestConfirmation':
      title = CONFIRM_TRANSACTION
      message = CONFIRMATION_REQUEST
      url = null
      break

    case 'sendTransactionHash':
      title = TRANSACTION_SUBMITTED
      message = payload.chainHash
      const etherScanUrl = (getNetwork() === MAINNET)
        ? 'https://etherscan.io/tx/'
        : 'https://rinkeby.etherscan.io/tx/'
      url = etherScanUrl + payload.chainHash
      break

    case 'rejectTransaction':
      title = TRANSACTION_REJECTED
      message = payload.hash
      url = null
      break

    default:
      return
  }

  self.clients.matchAll({ includeUncontrolled: true })
    .then((clients) => {
      const client = clients.filter(client =>
        client.url.split('/')[3] === '_generated_background_page.html'
      )[0]
      client.postMessage(payload)
    })
    .catch((err) => {
      console.error(err)
    })

  event.waitUntil(
    self.registration.showNotification(
      title,
      {
        body: message,
        icon: notificationImage,
        data: {
          url
        }
      }
    ).then(() =>
      self.registration.getNotifications()
    ).then(notifications => {
      setTimeout(() => notifications.forEach(notification => notification.close()), 6000)
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    (event.notification.data.url) ? self.clients.openWindow(event.notification.data.url) : null
  )
})
