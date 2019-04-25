import firebase from 'firebase/app'
import 'firebase/messaging'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'
import fetch from 'node-fetch'

import {
  getFirebaseAuthDomain,
  getFirebaseDatabaseUrl,
  getFirebaseProjectId,
  getFirebaseStorageBucket,
  getFirebaseMessagingSenderId,
  getPushNotificationServiceUrl,
  getAppVersionNumber,
  getAppBuildNumber
} from '../../../../../../../config'

export const setUpNotifications = () => {
  const messaging = setUpFirebase()
  return messaging.getToken()
}

const setUpFirebase = () => {
  const configFirebase = {
    authDomain: getFirebaseAuthDomain(),
    databaseURL: getFirebaseDatabaseUrl(),
    projectId: getFirebaseProjectId(),
    storageBucket: getFirebaseStorageBucket(),
    messagingSenderId: getFirebaseMessagingSenderId()
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase)
  }
  return firebase.messaging()
}

export const authPushNotificationService = async (pushToken, privateKeys) => {
  try {
    const url = getPushNotificationServiceUrl() + '/api/v2/auth/'
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = generateAuthContent(pushToken, privateKeys)
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    })
    return response && response.status === 201
  } catch (err) {
    console.error(err)
    return false
  }
}

// Data sent to the push notification service to register and pair the device.
const generateAuthContent = (pushToken, privateKeys) => {
  const data = EthUtil.sha3('GNO' + pushToken)

  const processedPrivateKeys = privateKeys.map(privateKey => {
    const vrs = EthUtil.ecsign(data, privateKey)
    const v = vrs.v
    const r = new BigNumber(EthUtil.bufferToHex(vrs.r)).toString(10)
    const s = new BigNumber(EthUtil.bufferToHex(vrs.s)).toString(10)
    return { r, s, v }
  })

  const authContent = JSON.stringify({
    push_token: pushToken,
    build_number: getAppBuildNumber(),
    version_name: getAppVersionNumber(),
    client: 'extension',
    bundle: 'safe-browser-extension',
    signatures: processedPrivateKeys
  })
  return authContent
}
