import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'
import 'babel-polyfill'
import TruffleContract from 'truffle-contract'
import Web3 from 'web3'

import GnosisSafePersonalEdition from '../../contracts/GnosisSafePersonalEdition.json'
import config from '../../config'

export const requestConfirmationResponse = (
  type,
  accountAddress,
  privateKey,
  hash,
  safeAddress,
  prefix
) => {
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

  return sendNotification(data, privateKey, accountAddress, safeAddress)
}

export const sendNotification = async (
  data,
  privateKey,
  accountAddress,
  safeAddress
) => {
  let owners
  try {
    owners = await getOwners(accountAddress, safeAddress)
  }
  catch (err) {
    console.error(err)
    return
  }

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

  return fetch(url, {
    method: 'POST',
    headers,
    body,
  })

}

const getOwners = (accountAddress, safeAddress) => {
  const contract = TruffleContract(GnosisSafePersonalEdition)
  const provider = new Web3.providers.HttpProvider(
    config.networks[config.currentNetwork].url
  )
  contract.setProvider(provider)

  return contract.at(safeAddress)
    .then((instance) => {
      return instance.getOwners()
    })
    .then((owners) => {
      return owners.filter(owner => owner !== accountAddress)
    })
}
