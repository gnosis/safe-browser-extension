import { ensureOnce } from 'utils/singleton'
import {
  NETWORK_NAME,
  NETWORK_VERSION,
  NETWORK_URL,
  ANDROID_APP_URL,
  IOS_APP_URL,
  PUSH_NOTIFICATION_SERVICE_URL,
  TRANSACTION_RELAY_SERVICE_URL,
  TOKEN_LIST_URL,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID
} from './names'
import mainConfig from './main'
import manifest from '../extension/manifest.json'

const configuration = () => {
  return mainConfig
}

const getConfig = ensureOnce(configuration)

const checkProdEnviroment = () => {
  const env = process.env.NODE_ENV
  return (env === 'pre-production' || env === 'production')
}

export const getVersion = () => {
  return manifest.version
}

export const getNetworkName = () => {
  if (process.env.NODE_ENV === 'production' && process.env.NETWORK_NAME) {
    return process.env.NETWORK_NAME
  }

  const config = getConfig()
  return config[NETWORK_NAME]
}

export const getNetworkVersion = () => {
  if (process.env.NODE_ENV === 'production' && process.env.NETWORK_VERSION) {
    return process.env.NETWORK_VERSION
  }

  const config = getConfig()
  return config[NETWORK_VERSION]
}

export const getNetworkUrl = () => {
  if (process.env.NODE_ENV === 'production' && process.env.NETWORK_URL) {
    return process.env.NETWORK_URL
  }

  const config = getConfig()
  return config[NETWORK_URL]
}

export const getAndroidAppUrl = () => {
  const config = getConfig()
  return config[ANDROID_APP_URL]
}

export const getIosAppUrl = () => {
  const config = getConfig()
  return config[IOS_APP_URL]
}

export const getPushNotificationServiceUrl = () => {
  if (checkProdEnviroment() && process.env.PUSH_NOTIFICATION_SERVICE_URL) {
    return process.env.PUSH_NOTIFICATION_SERVICE_URL
  }

  const config = getConfig()
  return config[PUSH_NOTIFICATION_SERVICE_URL]
}

export const getTransactionRelayServiceUrl = () => {
  if (checkProdEnviroment() && process.env.TRANSACTION_RELAY_SERVICE_URL) {
    return process.env.TRANSACTION_RELAY_SERVICE_URL
  }

  const config = getConfig()
  return config[TRANSACTION_RELAY_SERVICE_URL]
}

export const getTokenListUrl = () => {
  const config = getConfig()
  return config[TOKEN_LIST_URL]
}

export const getFirebaseAuthDomain = () => {
  if (checkProdEnviroment() && process.env.FIREBASE_AUTH_DOMAIN) {
    return process.env.FIREBASE_AUTH_DOMAIN
  }

  const config = getConfig()
  return config[FIREBASE_AUTH_DOMAIN]
}

export const getFirebaseDatabaseUrl = () => {
  if (checkProdEnviroment() && process.env.FIREBASE_DATABASE_URL) {
    return process.env.FIREBASE_DATABASE_URL
  }

  const config = getConfig()
  return config[FIREBASE_DATABASE_URL]
}

export const getFirebaseProjectId = () => {
  if (checkProdEnviroment() && process.env.FIREBASE_PROJECT_ID) {
    return process.env.FIREBASE_PROJECT_ID
  }

  const config = getConfig()
  return config[FIREBASE_PROJECT_ID]
}

export const getFirebaseStorageBucket = () => {
  if (checkProdEnviroment() && process.env.FIREBASE_STORAGE_BUCKET) {
    return process.env.FIREBASE_STORAGE_BUCKET
  }

  const config = getConfig()
  return config[FIREBASE_STORAGE_BUCKET]
}

export const getFirebaseMessagingSenderId = () => {
  if (checkProdEnviroment() && process.env.FIREBASE_MESSAGING_SENDER_ID) {
    return process.env.FIREBASE_MESSAGING_SENDER_ID
  }

  const config = getConfig()
  return config[FIREBASE_MESSAGING_SENDER_ID]
}
