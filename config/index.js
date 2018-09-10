import { ensureOnce } from 'utils/singleton'
import {
  NETWORK_NAME,
  NETWORK_VERSION,
  NETWORK_URL,
  ANDROID_APP_LINK,
  IOS_APP_LINK,
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

const configuration = () => {
  return mainConfig
}

const getConfig = ensureOnce(configuration)

export const getNetworkName = () => {
  const config = getConfig()
  return config[NETWORK_NAME]
}

export const getNetworkVersion = () => {
  const config = getConfig()
  return config[NETWORK_VERSION]
}

export const getNetworkUrl = () => {
  const config = getConfig()
  return config[NETWORK_URL]
}

export const getAndroidAppLink = () => {
  const config = getConfig()
  return config[ANDROID_APP_LINK]
}

export const getIosAppLink = () => {
  const config = getConfig()
  return config[IOS_APP_LINK]
}

export const getPushNotificationServiceUrl = () => {
  const config = getConfig()
  return config[PUSH_NOTIFICATION_SERVICE_URL]
}

export const getTransactionRelayServiceUrl = () => {
  const config = getConfig()
  return config[TRANSACTION_RELAY_SERVICE_URL]
}

export const getTokenListUrl = () => {
  const config = getConfig()
  return config[TOKEN_LIST_URL]
}

export const getFirebaseAuthDomain = () => {
  const config = getConfig()
  return config[FIREBASE_AUTH_DOMAIN]
}

export const getFirebaseDatabaseUrl = () => {
  const config = getConfig()
  return config[FIREBASE_DATABASE_URL]
}

export const getFirebaseProjectId = () => {
  const config = getConfig()
  return config[FIREBASE_PROJECT_ID]
}

export const getFirebaseStorageBucket = () => {
  const config = getConfig()
  return config[FIREBASE_STORAGE_BUCKET]
}

export const getFirebaseMessagingSenderId = () => {
  const config = getConfig()
  return config[FIREBASE_MESSAGING_SENDER_ID]
}
