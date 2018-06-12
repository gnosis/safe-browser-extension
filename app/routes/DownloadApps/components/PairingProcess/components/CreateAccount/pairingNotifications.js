import firebase from 'firebase/app'
import 'firebase/messaging'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import config from '../../../../../../../config'

export const setUpNotifications = () => {
  const messaging = setUpFirebase()
  return messaging.getToken()
}

const setUpFirebase = () => {
  const configFirebase = {
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase)
  }
  return firebase.messaging()
}

export const authPushNotificationService = (pushToken, privateKey) => {
  const url = config.pushNotificationServiceUrl + 'auth/'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const body = generateAuthContent(pushToken, privateKey)

  return fetch(url, {
    method: 'POST',
    headers,
    body,
  })
    .then((response) => {
      return (response.status === 201)
        ? true
        : false
    })
    .catch((err) => {
      console.error(err)
      return false
    })
}

// Data sent to the push notification service to register and pair the device.
const generateAuthContent = (pushToken, privateKey) => {
  const data = EthUtil.sha3('GNO' + pushToken)
  const vrs = EthUtil.ecsign(data, privateKey)
  const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
  const authContent = JSON.stringify({
    signature: {
      r: r.toString(10),
      s: s.toString(10),
      v: vrs.v,
    },
    push_token: pushToken,
  })
  return authContent
}