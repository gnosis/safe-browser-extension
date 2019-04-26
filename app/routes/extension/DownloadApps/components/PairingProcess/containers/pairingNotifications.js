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

export const authPushNotificationService = async (pushToken, accounts) => {
  try {
    const url = getPushNotificationServiceUrl() + '/api/v2/auth/'
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = generateAuthContent(pushToken, accounts)

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    })
    if (response && response.status === 201) {
      const authResponse = await response.json()
      if (authResponse.length !== accounts.length) {
        return false
      }
      const accountAddresses = accounts.map(account => account.getChecksumAddressString()).sort()
      const authAddresses = authResponse.map(account => account.owner).sort()
      return JSON.stringify(accountAddresses) == JSON.stringify(authAddresses)
    }
    return false
  } catch (err) {
    console.error(err)
    return false
  }
}

// Data sent to the push notification service to register and pair the device.
const generateAuthContent = (pushToken, accounts) => {
  const buildNumber = getAppBuildNumber()
  const versionNumber = getAppVersionNumber()
  const client = 'extension'
  const bundle = 'safe-browser-extension'

  const data = EthUtil.sha3('GNO' + pushToken + buildNumber + versionNumber + client + bundle)

  const signatures = accounts.map(account => {
    const vrs = EthUtil.ecsign(data, account.getPrivateKey())
    const v = vrs.v
    const r = new BigNumber(EthUtil.bufferToHex(vrs.r)).toString(10)
    const s = new BigNumber(EthUtil.bufferToHex(vrs.s)).toString(10)
    return { r, s, v }
  })

  const authContent = JSON.stringify({
    push_token: pushToken,
    build_number: buildNumber,
    version_name: versionNumber,
    client,
    bundle,
    signatures
  })
  return authContent
}
