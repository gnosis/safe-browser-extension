import firebase from 'firebase'
import EthUtil from 'ethereumjs-util'
import Web3 from 'web3'

import config from '../../../../../config'

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
  firebase.initializeApp(configFirebase)
  return firebase.messaging()
}

export const authPushNotificationService = (pushToken, privateKey) => {
  const url = config.pushNotificationServiceUrl
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

const generateAuthContent = (pushToken, privateKey) => {
  const web3 = new Web3()

  const data = EthUtil.sha3('GNO' + pushToken)
  const vrs = EthUtil.ecsign(data, privateKey)
  const authContent = JSON.stringify({
    signature: {
      v: vrs.v,
      r: web3.toBigNumber(EthUtil.bufferToHex(vrs.r)).toString(10),
      s: web3.toBigNumber(EthUtil.bufferToHex(vrs.s)).toString(10),
    },
    push_token: pushToken,
  })
  return authContent
}
