module.exports = {
  currentNetwork: 'Kovan',
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
  androidAppLink: 'https://play.google.com/<android-app-link-here>',
  iOSAppLink: 'https://itunes.apple.com/<ios-app-link-here>',
  pushNotificationServiceUrl: 'https://safe-notification.dev.gnosisdev.com/api/v1/auth/',
  firebase: {
    authDomain: "test-safe-notifications.firebaseapp.com",
    databaseURL: "https://test-safe-notifications.firebaseio.com",
    projectId: "test-safe-notifications",
    storageBucket: "test-safe-notifications.appspot.com",
    messagingSenderId: "64389160972",
  },
  mockSafesAdresses: [
    '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
    '0xffcf8fdee72ac11b5c542428b35eef5769c409f0',
    '0x22d491bde2303f2f43325b2108d26f1eaba1e32b',
    '0xe11ba2b4d45eaed5996cd0823791e0c93114882d',
    '0xd03ea8624c8c5987235048901fb614fdca89b117',
    '0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc',
    '0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9',
    '0x28a8746e75304c0780e011bed21c72cd78cd535e',
    '0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e',
    '0x1df62f291b2e969fb0849d99d9ce41e2f137006e',
  ]
}
