/* eslint-env serviceworker */
import { getNetwork } from '../config'
import { MAINNET } from '../config/names'
import notificationLogoMainnet from 'assets/images/favicon_mainnet.png'
import notificationLogoRinkeby from 'assets/images/favicon_rinkeby.png'

self.addEventListener('push', (event) => {
  const payload = event.data.json().data

  let title, message, url
  let knownPush = true
  switch (payload.type) {
    case 'safeCreation':
      title = 'Safe connected'
      message = 'Your Safe is now synced to your Authenticator'
      url = null
      break

    case 'requestConfirmation':
      title = 'Confirm transaction'
      message = 'The confirmation of a new transaction was requested'
      url = null
      break

    case 'sendTransactionHash':
      title = 'Transaction submitted'
      message = payload.chainHash
      const etherScanUrl =
        getNetwork() === MAINNET
          ? 'https://etherscan.io/tx/'
          : 'https://rinkeby.etherscan.io/tx/'
      url = etherScanUrl + payload.chainHash
      break

    case 'rejectTransaction':
      title = 'Transaction rejected'
      message = payload.hash
      url = null
      break

    case 'signTypedDataConfirmation':
      title = 'Sign typed data confirmation'
      message = 'Data signed'
      url = null
      break

    default:
      knownPush = false
  }

  if (knownPush) {
    self.clients
      .matchAll({ includeUncontrolled: true })
      .then((clients) => {
        const client = clients.filter(
          (client) =>
            client.url.split('/')[3] === '_generated_background_page.html'
        )[0]
        client.postMessage(payload)
      })
      .catch((err) => {
        console.error(err)
      })

    event.waitUntil(
      self.registration
        .showNotification(title, {
          body: message,
          icon:
            getNetwork() === MAINNET
              ? notificationLogoMainnet
              : notificationLogoRinkeby,
          data: {
            url
          }
        })
        .then(() => self.registration.getNotifications())
        .then((notifications) => {
          setTimeout(
            () => notifications.forEach((notification) => notification.close()),
            6000
          )
        })
    )
  } else {
    event.waitUntil(new Promise(() => {}))
  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    event.notification.data.url
      ? self.clients.openWindow(event.notification.data.url)
      : null
  )
})
