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

const mainConfig = {
  [NETWORK_NAME]: 'Rinkeby',
  [NETWORK_VERSION]: 4,
  [NETWORK_URL]: 'https://rinkeby.infura.io/gnosis',
  [ANDROID_APP_URL]: 'https://play.google.com/apps/testing/pm.gnosis.heimdall.dev',
  [IOS_APP_URL]: 'https://itunes.apple.com/<ios-app-link-here>',
  [PUSH_NOTIFICATION_SERVICE_URL]: 'https://safe-notification.staging.gnosisdev.com/api/v1/',
  [TRANSACTION_RELAY_SERVICE_URL]: 'https://safe-relay.staging.gnosisdev.com/api/v1/',
  [TOKEN_LIST_URL]: 'https://gist.githubusercontent.com/rmeissner/98911fcf74b0ea9731e2dae2441c97a4/raw/',
  [FIREBASE_AUTH_DOMAIN]: 'test-safe-notifications.firebaseapp.com',
  [FIREBASE_DATABASE_URL]: 'https://test-safe-notifications.firebaseio.com',
  [FIREBASE_PROJECT_ID]: 'test-safe-notifications',
  [FIREBASE_STORAGE_BUCKET]: 'test-safe-notifications.appspot.com',
  [FIREBASE_MESSAGING_SENDER_ID]: '64389160972'
}

export default mainConfig
