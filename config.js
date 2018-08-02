module.exports = {
  currentNetwork: 'Rinkeby',
  networks: {
    'Mainnet': {
      version: 1,
      url: 'https://mainnet.infura.io/gnosis'
    },
    'Ropsten': {
      version: 3,
      url: 'https://ropsten.infura.io/gnosis'
    },
    'Rinkeby': {
      version: 4,
      url: 'https://rinkeby.infura.io/gnosis'
    },
    'Kovan': {
      version: 42,
      url: 'https://kovan.infura.io/gnosis'
    }
  },
  androidAppLink: 'https://play.google.com/apps/testing/pm.gnosis.heimdall.dev',
  iOSAppLink: 'https://itunes.apple.com/<ios-app-link-here>',
  pushNotificationServiceUrl: 'https://safe-notification.staging.gnosisdev.com/api/v1/',
  transactionRelayServiceUrl: 'https://safe-relay.staging.gnosisdev.com/api/v1/',
  firebase: {
    authDomain: 'test-safe-notifications.firebaseapp.com',
    databaseURL: 'https://test-safe-notifications.firebaseio.com',
    projectId: 'test-safe-notifications',
    storageBucket: 'test-safe-notifications.appspot.com',
    messagingSenderId: '64389160972'
  }
}
