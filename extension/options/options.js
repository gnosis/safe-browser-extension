var message = document.getElementById('message');
var notificationsButton = document.getElementById('requestNotitications');

navigator.permissions.query({ name: 'notifications' })
  .then(function (permission) {
    switch (permission.state) {
      case 'granted':
        notificationsButton.style.display = 'none';
        message.innerHTML = 'Notifications are allowed';
        break;

      case 'denied':
        message.innerHTML = 'You need to allow notifications';
        break;

      case 'prompt':
        notificationsButton.style.display = 'block';
        message.innerHTML = 'You need to allow notifications';

        notificationsButton.addEventListener('click', function () {
          Notification.requestPermission()
            .then(function (permission) {
              if (permission === 'granted') {
                window.close();
              }
              if (permission === 'denied') {
                notificationsButton.style.display = 'none';
              }
            })
            .catch(function (err) {
              console.error(err);
            })
        })
        break;
    }
  })
