import {
  getNetworkName,
  getNetworkVersion,
  getNetworkUrl,
  getAndroidAppUrl,
  getIosAppUrl,
  getPushNotificationServiceUrl,
  getTransactionRelayServiceUrl,
  getFirebaseAuthDomain,
  getFirebaseDatabaseUrl,
  getFirebaseProjectId,
  getFirebaseStorageBucket,
  getFirebaseMessagingSenderId,
  getFavicon
} from './index'
import {
  MAINNET,
  RINKEBY,
  PRODUCTION,
  PRE_PRODUCTION,
  STAGING,
  DEVELOPMENT
} from './names'

const testGetNetworkName = (value) => {
  const networkName = getNetworkName()
  const validNetworkName = (networkName && networkName !== '')
  expect(validNetworkName).toEqual(true)
  expect(networkName).toEqual(value)
}

const testGetNetworkVersion = (value) => {
  const networkVersion = getNetworkVersion()
  const validNetworkVersion = (networkVersion && networkVersion >= 0)
  expect(validNetworkVersion).toEqual(true)
  expect(getNetworkVersion()).toEqual(value)
}

const testGetNetworkUrl = (value) => {
  const networkUrl = getNetworkUrl()
  const validNetworkUrl = (networkUrl && networkUrl !== '')
  expect(validNetworkUrl).toEqual(true)
  expect(networkUrl).toEqual(value)
}

const testGetAndroidAppUrl = (value) => {
  const androidAppUrl = getAndroidAppUrl()
  const validAndroidAppUrl = (androidAppUrl && androidAppUrl !== '')
  expect(validAndroidAppUrl).toEqual(true)
  expect(androidAppUrl).toEqual(value)
}

const testGetIosAppUrl = (value) => {
  const iosAppUrl = getIosAppUrl()
  const validIosAppUrl = (iosAppUrl && iosAppUrl !== '')
    ? true
    : false
  const extistsIosApp = (value)
    ? true
    : false
  expect(validIosAppUrl).toEqual(extistsIosApp)
  expect(getIosAppUrl()).toEqual(value)
}

const testGetPushNotificationServiceUrl = (value) => {
  const pushNotificationServiceUrl = getPushNotificationServiceUrl()
  const validPushNotificationServiceUrl = (pushNotificationServiceUrl && pushNotificationServiceUrl !== '')
  expect(validPushNotificationServiceUrl).toEqual(true)
  expect(pushNotificationServiceUrl).toEqual(value)
}

const testGetTransactionRelayServiceUrl = (value) => {
  const transactionRelayServiceUrl = getTransactionRelayServiceUrl()
  const validTransactionRelayServiceUrl = (transactionRelayServiceUrl && transactionRelayServiceUrl !== '')
  expect(validTransactionRelayServiceUrl).toEqual(true)
  expect(transactionRelayServiceUrl).toEqual(value)
}

const testGetFirebaseAuthDomain = (value) => {
  const firebaseAuthDomain = getFirebaseAuthDomain()
  const validFirebaseAuthDomain = (firebaseAuthDomain && firebaseAuthDomain !== '')
  expect(validFirebaseAuthDomain).toEqual(true)
  expect(firebaseAuthDomain).toEqual(value)
}

const testGetFirebaseDatabaseUrl = (value) => {
  const firebaseDatabaseUrl = getFirebaseDatabaseUrl()
  const validFirebaseDatabaseUrl = (firebaseDatabaseUrl && firebaseDatabaseUrl !== '')
  expect(validFirebaseDatabaseUrl).toEqual(true)
  expect(firebaseDatabaseUrl).toEqual(value)
}

const testGetFirebaseProjectId = (value) => {
  const firebaseProjectId = getFirebaseProjectId()
  const validFirebaseProjectId = (firebaseProjectId && firebaseProjectId !== '')
  expect(validFirebaseProjectId).toEqual(true)
  expect(firebaseProjectId).toEqual(value)
}

const testGetFirebaseStorageBucket = (value) => {
  const firebaseStorageBucket = getFirebaseStorageBucket()
  const validFirebaseStorageBucket = (firebaseStorageBucket && firebaseStorageBucket !== '')
  expect(validFirebaseStorageBucket).toEqual(true)
  expect(firebaseStorageBucket).toEqual(value)
}

const testGetFirebaseMessagingSenderId = (value) => {
  const firebaseMessagingSenderId = getFirebaseMessagingSenderId()
  const validFirebaseMessagingSenderId = (firebaseMessagingSenderId && firebaseMessagingSenderId !== '')
  expect(validFirebaseMessagingSenderId).toEqual(true)
  expect(firebaseMessagingSenderId.toString()).toEqual(value.toString())
}

const testGetFavicon = (value) => {
  const favicon = getFavicon()
  const validFavicon = (favicon && favicon !== '')
  expect(validFavicon).toEqual(true)
  expect(favicon).toEqual(value)
}

describe('Configuration', () => {
  describe('Configuration Development Rinkeby', () => {
    beforeAll(() => {
      process.env.NODE_ENV = DEVELOPMENT
      process.env.NETWORK = RINKEBY
    })

    test('getNetworkName', () => {
      testGetNetworkName('Rinkeby')
    })

    test('getNetworkVersion', () => {
      testGetNetworkVersion(4)
    })

    test('getNetworkUrl', () => {
      testGetNetworkUrl('https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
    })

    test('getAndroidAppUrl', () => {
      testGetAndroidAppUrl('https://betas.to/riowXzcx')
    })

    test('getIosAppUrl', () => {
      testGetIosAppUrl('https://betas.to/qnfzuPN6')
    })

    test('getPushNotificationServiceUrl', () => {
      testGetPushNotificationServiceUrl('https://safe-notification.staging.gnosisdev.com')
    })

    test('getTransactionRelayServiceUrl', () => {
      testGetTransactionRelayServiceUrl('https://safe-relay.staging.gnosisdev.com')
    })

    test('getFirebaseAuthDomain', () => {
      testGetFirebaseAuthDomain('test-safe-notifications.firebaseapp.com')
    })

    test('getFirebaseDatabaseUrl', () => {
      testGetFirebaseDatabaseUrl('https://test-safe-notifications.firebaseio.com')
    })

    test('getFirebaseProjectId', () => {
      testGetFirebaseProjectId('test-safe-notifications')
    })

    test('getFirebaseStorageBucket', () => {
      testGetFirebaseStorageBucket('test-safe-notifications.appspot.com')
    })

    test('getFirebaseMessagingSenderId ', () => {
      testGetFirebaseMessagingSenderId('64389160972')
    })

    test('getFavicon', () => {
      testGetFavicon('favicon_rinkeby_red.png')
    })
  })

  describe('Configuration Staging Rinkeby', () => {
    beforeAll(() => {
      process.env.NODE_ENV = STAGING
      process.env.NETWORK = RINKEBY
    })

    test('getNetworkName', () => {
      testGetNetworkName('Rinkeby')
    })

    test('getNetworkVersion', () => {
      testGetNetworkVersion(4)
    })

    test('getNetworkUrl', () => {
      testGetNetworkUrl('https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
    })

    test('getAndroidAppUrl', () => {
      testGetAndroidAppUrl('https://betas.to/riowXzcx')
    })

    test('getIosAppUrl', () => {
      testGetIosAppUrl('https://betas.to/qnfzuPN6')
    })

    test('getPushNotificationServiceUrl', () => {
      testGetPushNotificationServiceUrl('https://safe-notification.staging.gnosisdev.com')
    })

    test('getTransactionRelayServiceUrl', () => {
      testGetTransactionRelayServiceUrl('https://safe-relay.staging.gnosisdev.com')
    })

    test('getFirebaseAuthDomain', () => {
      testGetFirebaseAuthDomain('test-safe-notifications.firebaseapp.com')
    })

    test('getFirebaseDatabaseUrl', () => {
      testGetFirebaseDatabaseUrl('https://test-safe-notifications.firebaseio.com')
    })

    test('getFirebaseProjectId', () => {
      testGetFirebaseProjectId('test-safe-notifications')
    })

    test('getFirebaseStorageBucket', () => {
      testGetFirebaseStorageBucket('test-safe-notifications.appspot.com')
    })

    test('getFirebaseMessagingSenderId ', () => {
      testGetFirebaseMessagingSenderId('64389160972')
    })

    test('getFavicon', () => {
      testGetFavicon('favicon_rinkeby_orange.png')
    })
  })

  describe('Configuration Pre-production Rinkeby', () => {
    beforeAll(() => {
      process.env.NODE_ENV = PRE_PRODUCTION
      process.env.NETWORK = RINKEBY
    })

    test('getNetworkName', () => {
      testGetNetworkName('Rinkeby')
    })

    test('getNetworkVersion', () => {
      testGetNetworkVersion(4)
    })

    test('getNetworkUrl', () => {
      testGetNetworkUrl('https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
    })

    test('getAndroidAppUrl', () => {
      testGetAndroidAppUrl('https://play.google.com/store/apps/details?id=pm.gnosis.heimdall.dev')
    })

    test('getIosAppUrl', () => {
      testGetIosAppUrl('https://testflight.apple.com/join/r9q5stIb')
    })

    test('getPushNotificationServiceUrl', () => {
      testGetPushNotificationServiceUrl('https://safe-notification.gnosis.pm')
    })

    test('getTransactionRelayServiceUrl', () => {
      testGetTransactionRelayServiceUrl('https://safe-relay.rinkeby.gnosis.pm')
    })

    test('getFirebaseAuthDomain', () => {
      testGetFirebaseAuthDomain(process.env.FIREBASE_AUTH_DOMAIN)
    })

    test('getFirebaseDatabaseUrl', () => {
      testGetFirebaseDatabaseUrl(process.env.FIREBASE_DATABASE_URL)
    })

    test('getFirebaseProjectId', () => {
      testGetFirebaseProjectId(process.env.FIREBASE_PROJECT_ID)
    })

    test('getFirebaseStorageBucket', () => {
      testGetFirebaseStorageBucket(process.env.FIREBASE_STORAGE_BUCKET)
    })

    test('getFirebaseMessagingSenderId ', () => {
      testGetFirebaseMessagingSenderId(process.env.FIREBASE_MESSAGING_SENDER_ID)
    })

    test('getFavicon', () => {
      testGetFavicon('favicon_rinkeby_green.png')
    })
  })

  describe('Configuration Pre-production Mainnet', () => {
    beforeAll(() => {
      process.env.NODE_ENV = PRE_PRODUCTION
      process.env.NETWORK = MAINNET
    })

    test('getNetworkName', () => {
      testGetNetworkName('Mainnet')
    })

    test('getNetworkVersion', () => {
      testGetNetworkVersion(1)
    })

    test('getNetworkUrl', () => {
      testGetNetworkUrl('https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
    })

    test('getAndroidAppUrl', () => {
      testGetAndroidAppUrl('https://play.google.com/store/apps/details?id=pm.gnosis.heimdall')
    })

    test('getIosAppUrl', () => {
      testGetIosAppUrl('https://appstore.com/gnosissafesmartwallet')
    })

    test('getPushNotificationServiceUrl', () => {
      testGetPushNotificationServiceUrl('https://safe-notification.gnosis.pm')
    })

    test('getTransactionRelayServiceUrl', () => {
      testGetTransactionRelayServiceUrl('https://safe-relay.gnosis.pm')
    })

    test('getFirebaseAuthDomain', () => {
      testGetFirebaseAuthDomain(process.env.FIREBASE_AUTH_DOMAIN)
    })

    test('getFirebaseDatabaseUrl', () => {
      testGetFirebaseDatabaseUrl(process.env.FIREBASE_DATABASE_URL)
    })

    test('getFirebaseProjectId', () => {
      testGetFirebaseProjectId(process.env.FIREBASE_PROJECT_ID)
    })

    test('getFirebaseStorageBucket', () => {
      testGetFirebaseStorageBucket(process.env.FIREBASE_STORAGE_BUCKET)
    })

    test('getFirebaseMessagingSenderId ', () => {
      testGetFirebaseMessagingSenderId(process.env.FIREBASE_MESSAGING_SENDER_ID)
    })

    test('getFavicon', () => {
      testGetFavicon('favicon_mainnet_green.png')
    })
  })

  describe('Configuration Production Rinkeby', () => {
    beforeAll(() => {
      process.env.NODE_ENV = PRODUCTION
      process.env.NETWORK = RINKEBY
    })

    test('getNetworkName', () => {
      testGetNetworkName('Rinkeby')
    })

    test('getNetworkVersion', () => {
      testGetNetworkVersion(4)
    })

    test('getNetworkUrl', () => {
      testGetNetworkUrl('https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
    })

    test('getAndroidAppUrl', () => {
      testGetAndroidAppUrl('https://play.google.com/store/apps/details?id=pm.gnosis.heimdall.dev')
    })

    test('getIosAppUrl', () => {
      testGetIosAppUrl('https://testflight.apple.com/join/r9q5stIb')
    })

    test('getPushNotificationServiceUrl', () => {
      testGetPushNotificationServiceUrl('https://safe-notification.gnosis.pm')
    })

    test('getTransactionRelayServiceUrl', () => {
      testGetTransactionRelayServiceUrl('https://safe-relay.rinkeby.gnosis.pm')
    })

    test('getFirebaseAuthDomain', () => {
      testGetFirebaseAuthDomain(process.env.FIREBASE_AUTH_DOMAIN)
    })

    test('getFirebaseDatabaseUrl', () => {
      testGetFirebaseDatabaseUrl(process.env.FIREBASE_DATABASE_URL)
    })

    test('getFirebaseProjectId', () => {
      testGetFirebaseProjectId(process.env.FIREBASE_PROJECT_ID)
    })

    test('getFirebaseStorageBucket', () => {
      testGetFirebaseStorageBucket(process.env.FIREBASE_STORAGE_BUCKET)
    })

    test('getFirebaseMessagingSenderId ', () => {
      testGetFirebaseMessagingSenderId(process.env.FIREBASE_MESSAGING_SENDER_ID)
    })

    test('getFavicon', () => {
      testGetFavicon('favicon_rinkeby.png')
    })
  })

  describe('Configuration Production Mainnet', () => {
    beforeAll(() => {
      process.env.NODE_ENV = PRODUCTION
      process.env.NETWORK = MAINNET
    })

    test('getNetworkName', () => {
      testGetNetworkName('Mainnet')
    })

    test('getNetworkVersion', () => {
      testGetNetworkVersion(1)
    })

    test('getNetworkUrl', () => {
      testGetNetworkUrl('https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
    })

    test('getAndroidAppUrl', () => {
      testGetAndroidAppUrl('https://play.google.com/store/apps/details?id=pm.gnosis.heimdall')
    })

    test('getIosAppUrl', () => {
      testGetIosAppUrl('https://appstore.com/gnosissafesmartwallet')
    })

    test('getPushNotificationServiceUrl', () => {
      testGetPushNotificationServiceUrl('https://safe-notification.gnosis.pm')
    })

    test('getTransactionRelayServiceUrl', () => {
      testGetTransactionRelayServiceUrl('https://safe-relay.gnosis.pm')
    })

    test('getFirebaseAuthDomain', () => {
      testGetFirebaseAuthDomain(process.env.FIREBASE_AUTH_DOMAIN)
    })

    test('getFirebaseDatabaseUrl', () => {
      testGetFirebaseDatabaseUrl(process.env.FIREBASE_DATABASE_URL)
    })

    test('getFirebaseProjectId', () => {
      testGetFirebaseProjectId(process.env.FIREBASE_PROJECT_ID)
    })

    test('getFirebaseStorageBucket', () => {
      testGetFirebaseStorageBucket(process.env.FIREBASE_STORAGE_BUCKET)
    })

    test('getFirebaseMessagingSenderId ', () => {
      testGetFirebaseMessagingSenderId(process.env.FIREBASE_MESSAGING_SENDER_ID)
    })

    test('getFavicon', () => {
      testGetFavicon('favicon_mainnet.png')
    })
  })
})
