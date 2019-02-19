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
const mainnetAppStoreIos = 'http://appstore.com/gnosissafemainnet'
const rinkebyAppStoreAndroid = 'https://play.google.com/store/apps/details?id=pm.gnosis.heimdall.dev'
const rinkebyAppStoreIos = null
const rinkebyStagingAndroid = 'https://betas.to/riowXzcx'
const rinkebyStagingIos = 'https://betas.to/7TovLG11'

const stagingPushNotificationServiceUrl = 'https://safe-notification.staging.gnosisdev.com/api/v1/'

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
    [PUSH_NOTIFICATION_SERVICE_URL]: process.env.PUSH_NOTIFICATION_SERVICE_URL,
    [TRANSACTION_RELAY_SERVICE_URL]: {
      [MAINNET]: process.env.TRANSACTION_RELAY_SERVICE_MAINNET_URL,
      [RINKEBY]: process.env.TRANSACTION_RELAY_SERVICE_RINKEBY_URL
    },
    [FIREBASE_AUTH_DOMAIN]: process.env.FIREBASE_AUTH_DOMAIN,
    [FIREBASE_DATABASE_URL]: process.env.FIREBASE_DATABASE_URL,
    [FIREBASE_PROJECT_ID]: process.env.FIREBASE_PROJECT_ID,
    [FIREBASE_STORAGE_BUCKET]: process.env.FIREBASE_STORAGE_BUCKET,
    [FIREBASE_MESSAGING_SENDER_ID]: process.env.FIREBASE_MESSAGING_SENDER_ID,
    [FAVICON]: {
      [MAINNET]: 'favicon_mainnet.png',
      [RINKEBY]: 'favicon_rinkeby_blue.png'
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
    [PUSH_NOTIFICATION_SERVICE_URL]: process.env.PUSH_NOTIFICATION_SERVICE_URL,
    [TRANSACTION_RELAY_SERVICE_URL]: {
      [MAINNET]: process.env.TRANSACTION_RELAY_SERVICE_MAINNET_URL,
      [RINKEBY]: process.env.TRANSACTION_RELAY_SERVICE_RINKEBY_URL
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
    [TRANSACTION_RELAY_SERVICE_URL]: process.env.TRANSACTION_RELAY_SERVICE_RINKEBY_URL,
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
    [TRANSACTION_RELAY_SERVICE_URL]: process.env.TRANSACTION_RELAY_SERVICE_RINKEBY_URL,
    [FIREBASE_AUTH_DOMAIN]: testFirebaseAuthDomain,
    [FIREBASE_DATABASE_URL]: testFirebaseDatabaseUrl,
    [FIREBASE_PROJECT_ID]: testFirebaseProjectId,
    [FIREBASE_STORAGE_BUCKET]: testFirebaseStorageBucket,
    [FIREBASE_MESSAGING_SENDER_ID]: testFirebaseMessagingSenderId,
    [FAVICON]: 'favicon_rinkeby_red.png'
  }
}

export default envConfig
