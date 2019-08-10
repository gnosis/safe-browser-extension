import {
  MAINNET,
  RINKEBY,
  PRODUCTION,
  PRE_PRODUCTION,
  STAGING,
  DEVELOPMENT,
  PUSH_NOTIFICATION_SERVICE_URL,
  TRANSACTION_RELAY_SERVICE_URL,
  ANDROID_APP_URL,
  IOS_APP_URL,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FAVICON
} from './names'
import dotenv from 'dotenv'
dotenv.config({})

const mainnetAppStoreAndroid = 'https://play.google.com/store/apps/details?id=pm.gnosis.heimdall'
const mainnetAppStoreIos = 'https://appstore.com/gnosissafesmartwallet'
const rinkebyAppStoreAndroid = 'https://play.google.com/store/apps/details?id=pm.gnosis.heimdall.dev'
const rinkebyAppStoreIos = 'https://testflight.apple.com/join/r9q5stIb'
const rinkebyStagingAndroid = 'https://betas.to/riowXzcx'
const rinkebyStagingIos = 'https://betas.to/qnfzuPN6'

const prodPushNotificationServiceUrl = 'https://safe-notification.gnosis.pm'
const stagingPushNotificationServiceUrl = 'https://safe-notification.staging.gnosisdev.com'

const prodRinkebyTransactionRelayServiceUrl = 'https://safe-relay.rinkeby.gnosis.pm'
const prodMainnetTransactionRelayServiceUrl = 'https://safe-relay.gnosis.pm'
const stagingTransactionRelayServiceUrl = 'https://safe-relay.staging.gnosisdev.com'

const testFirebaseAuthDomain = 'test-safe-notifications.firebaseapp.com'
const testFirebaseDatabaseUrl = 'https://test-safe-notifications.firebaseio.com'
const testFirebaseProjectId = 'test-safe-notifications'
const testFirebaseStorageBucket = 'test-safe-notifications.appspot.com'
const testFirebaseMessagingSenderId = '64389160972'

const envConfig = {
  [PRODUCTION]: {
    [ANDROID_APP_URL]:
    {
      [MAINNET]: mainnetAppStoreAndroid,
      [RINKEBY]: rinkebyAppStoreAndroid
    },
    [IOS_APP_URL]:
    {
      [MAINNET]: mainnetAppStoreIos,
      [RINKEBY]: rinkebyAppStoreIos
    },
    [PUSH_NOTIFICATION_SERVICE_URL]: prodPushNotificationServiceUrl,
    [TRANSACTION_RELAY_SERVICE_URL]: {
      [MAINNET]: prodMainnetTransactionRelayServiceUrl,
      [RINKEBY]: prodRinkebyTransactionRelayServiceUrl
    },
    [FIREBASE_AUTH_DOMAIN]: process.env.FIREBASE_AUTH_DOMAIN,
    [FIREBASE_DATABASE_URL]: process.env.FIREBASE_DATABASE_URL,
    [FIREBASE_PROJECT_ID]: process.env.FIREBASE_PROJECT_ID,
    [FIREBASE_STORAGE_BUCKET]: process.env.FIREBASE_STORAGE_BUCKET,
    [FIREBASE_MESSAGING_SENDER_ID]: process.env.FIREBASE_MESSAGING_SENDER_ID,
    [FAVICON]: {
      [MAINNET]: 'favicon_mainnet.png',
      [RINKEBY]: 'favicon_rinkeby.png'
    }
  },
  [PRE_PRODUCTION]: {
    [ANDROID_APP_URL]: {
      [MAINNET]: mainnetAppStoreAndroid,
      [RINKEBY]: rinkebyAppStoreAndroid
    },
    [IOS_APP_URL]: {
      [MAINNET]: mainnetAppStoreIos,
      [RINKEBY]: rinkebyAppStoreIos
    },
    [PUSH_NOTIFICATION_SERVICE_URL]: prodPushNotificationServiceUrl,
    [TRANSACTION_RELAY_SERVICE_URL]: {
      [MAINNET]: prodMainnetTransactionRelayServiceUrl,
      [RINKEBY]: prodRinkebyTransactionRelayServiceUrl
    },
    [FIREBASE_AUTH_DOMAIN]: process.env.FIREBASE_AUTH_DOMAIN,
    [FIREBASE_DATABASE_URL]: process.env.FIREBASE_DATABASE_URL,
    [FIREBASE_PROJECT_ID]: process.env.FIREBASE_PROJECT_ID,
    [FIREBASE_STORAGE_BUCKET]: process.env.FIREBASE_STORAGE_BUCKET,
    [FIREBASE_MESSAGING_SENDER_ID]: process.env.FIREBASE_MESSAGING_SENDER_ID,
    [FAVICON]: {
      [MAINNET]: 'favicon_mainnet_green.png',
      [RINKEBY]: 'favicon_rinkeby_green.png'
    }
  },
  [STAGING]: {
    [ANDROID_APP_URL]: rinkebyStagingAndroid,
    [IOS_APP_URL]: rinkebyStagingIos,
    [PUSH_NOTIFICATION_SERVICE_URL]: stagingPushNotificationServiceUrl,
    [TRANSACTION_RELAY_SERVICE_URL]: stagingTransactionRelayServiceUrl,
    [FIREBASE_AUTH_DOMAIN]: testFirebaseAuthDomain,
    [FIREBASE_DATABASE_URL]: testFirebaseDatabaseUrl,
    [FIREBASE_PROJECT_ID]: testFirebaseProjectId,
    [FIREBASE_STORAGE_BUCKET]: testFirebaseStorageBucket,
    [FIREBASE_MESSAGING_SENDER_ID]: testFirebaseMessagingSenderId,
    [FAVICON]: 'favicon_rinkeby_orange.png'
  },
  [DEVELOPMENT]: {
    [ANDROID_APP_URL]: rinkebyStagingAndroid,
    [IOS_APP_URL]: rinkebyStagingIos,
    [PUSH_NOTIFICATION_SERVICE_URL]: stagingPushNotificationServiceUrl,
    [TRANSACTION_RELAY_SERVICE_URL]: stagingTransactionRelayServiceUrl,
    [FIREBASE_AUTH_DOMAIN]: testFirebaseAuthDomain,
    [FIREBASE_DATABASE_URL]: testFirebaseDatabaseUrl,
    [FIREBASE_PROJECT_ID]: testFirebaseProjectId,
    [FIREBASE_STORAGE_BUCKET]: testFirebaseStorageBucket,
    [FIREBASE_MESSAGING_SENDER_ID]: testFirebaseMessagingSenderId,
    [FAVICON]: 'favicon_rinkeby_red.png'
  }
}

export default envConfig
