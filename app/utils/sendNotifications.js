import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import config from '../../config'

export const sendNotification = (owners, data, privateKey) => {
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
