import notificationImage from 'assets/images/notification_image.jpg'

self.addEventListener('push', (event) => {
  const payload = event.data.json().data

  let title, message
  switch (payload.type) {

    case 'safeCreation':
      title = 'Safe Creation'
      message = 'A new Safe was created'
      break;

    case 'requestConfirmation':
      title = 'Confirm transaction'
      message = 'The confirmation of a new transaction was requested'
      break

    case 'sendTransactionHash':
      title = 'Transaction submitted'
      message = payload.chainHash
      break

    case 'rejectTransaction':
      title = 'Transaction rejected'
      message = payload.hash
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
        icon: notificationImage
      }
    )
  )
})
