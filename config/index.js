import { ensureOnce } from '../app/utils/singleton'
import {
  MAINNET,
  RINKEBY,
  PRODUCTION,
  PRE_PRODUCTION,
  STAGING,
  DEVELOPMENT,
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
  FIREBASE_MESSAGING_SENDER_ID,
  FAVICON
} from './names'
import envConfig from './env.config'
import networkConfig from './network.config'
import manifest from '../extension/manifest.json'

const envConfiguration = () => {
  return envConfig
}

const networkConfiguration = () => {
  return networkConfig
}

const getEnvConfig = ensureOnce(envConfiguration)

const getNetworkConfig = ensureOnce(networkConfiguration)

export const getEnviroment = () => {
  const env = process.env.NODE_ENV
  return (env === PRODUCTION || env === PRE_PRODUCTION || env === STAGING || env === DEVELOPMENT)
    ? env
    : STAGING
}

export const getNetwork = () => {
  const env = process.env.NETWORK
  return (env === MAINNET || env === RINKEBY)
    ? env
    : RINKEBY
}

export const getVersion = () => {
  return manifest.version
}

export const getNetworkName = () => {
  const config = getNetworkConfig()
  const network = getNetwork()
  return config[network][NETWORK_NAME]
}

export const getNetworkVersion = () => {
  const config = getNetworkConfig()
  const network = getNetwork()
  return config[network][NETWORK_VERSION]
}

export const getNetworkUrl = () => {
  const config = getNetworkConfig()
  const network = getNetwork()
  return config[network][NETWORK_URL]
}

export const getAndroidAppUrl = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][ANDROID_APP_URL]
}

export const getIosAppUrl = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][IOS_APP_URL]
}

export const getPushNotificationServiceUrl = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][PUSH_NOTIFICATION_SERVICE_URL]
}

export const getTransactionRelayServiceUrl = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  const network = getNetwork()
  return (enviroment === PRODUCTION || enviroment === PRE_PRODUCTION)
    ? config[enviroment][TRANSACTION_RELAY_SERVICE_URL][network]
    : config[enviroment][TRANSACTION_RELAY_SERVICE_URL]
}

export const getTokenListUrl = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  const network = getNetwork()
  return (enviroment === PRODUCTION || enviroment === PRE_PRODUCTION)
    ? config[enviroment][TOKEN_LIST_URL][network]
    : config[enviroment][TOKEN_LIST_URL]
}

export const getFirebaseAuthDomain = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][FIREBASE_AUTH_DOMAIN]
}

export const getFirebaseDatabaseUrl = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][FIREBASE_DATABASE_URL]
}

export const getFirebaseProjectId = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][FIREBASE_PROJECT_ID]
}

export const getFirebaseStorageBucket = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][FIREBASE_STORAGE_BUCKET]
}

export const getFirebaseMessagingSenderId = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  return config[enviroment][FIREBASE_MESSAGING_SENDER_ID]
}

export const getFavicon = () => {
  const config = getEnvConfig()
  const enviroment = getEnviroment()
  const network = getNetwork()
  return (enviroment === PRODUCTION || enviroment === PRE_PRODUCTION)
    ? config[enviroment][FAVICON][network]
    : config[enviroment][FAVICON]
}
