import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import config from '../../config'

export const requestConfirmationResponse = (type, privateKey, hash, prefix) => {
  const message = (prefix)
    ? prefix + hash
    : hash

  const signedTxHash = EthUtil.sha3(message)
  const vrsTxHash = EthUtil.ecsign(signedTxHash, privateKey)
  const r = new BigNumber(EthUtil.bufferToHex(vrsTxHash.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrsTxHash.s))
  const data = JSON.stringify({
    type: type,
    hash: hash,
    r: r.toString(10),
    s: s.toString(10),
    v: vrsTxHash.v.toString(10),
  })

  const response = sendNotification(data, privateKey)
  if (response) {
    console.log(response.status)
  }
}

export const sendNotification = (data, privateKey) => {
  const owners = []
  const signedData = EthUtil.sha3('GNO' + data)
  const vrs = EthUtil.ecsign(signedData, privateKey)

  const url = config.pushNotificationServiceUrl + 'notifications/'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
  const body = JSON.stringify({
    devices: owners,
    message: data,
    signature: {
      r: r.toString(10),
      s: s.toString(10),
      v: vrs.v,
    }
  })

  fetch(url, {
    method: 'POST',
    headers,
    body,
  })
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => {
      console.log(err)
      return
    })
}
