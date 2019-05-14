import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'
import 'babel-polyfill'
import fetch from 'node-fetch'
import { getTransactionEstimations } from 'routes/popup/Transaction/components/SendTransaction/containers/gasData'
import { isTokenTransfer } from 'routes/popup/Transaction/containers/tokens'
import GnosisSafe from '../../contracts/GnosisSafe.json'
import { getPushNotificationServiceUrl, getNetworkUrl } from '../../config'

export const sendSignMessage = async (
  accountAddress,
  privateKey,
  message,
  messageHash,
  safeAddress
) => {
  const hash = EthUtil.toBuffer(messageHash)
  const vrs = EthUtil.ecsign(hash, privateKey)
  const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
  const data = JSON.stringify({
    type: 'signTypedData',
    payload: message,
    safe: safeAddress,
    r: r.toString(10),
    s: s.toString(10),
    v: vrs.v.toString(10)
  })

  return sendNotification(data, privateKey, accountAddress, safeAddress)
}

export const sendTransaction = async (
  accountAddress,
  privateKey,
  tx,
  safeAddress
) => {
  const hash = EthUtil.toBuffer(tx.hash)
  const vrsTx = EthUtil.ecsign(hash, privateKey)
  const r = new BigNumber(EthUtil.bufferToHex(vrsTx.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrsTx.s))
  const data = JSON.stringify({
    type: 'sendTransaction',
    hash: tx.hash,
    safe: tx.safe,
    to: tx.to,
    value: tx.value ? new BigNumber(tx.value).toString(10) : undefined,
    data: tx.data,
    operation: tx.operation,
    txGas: tx.txGas,
    dataGas: tx.dataGas,
    operationalGas: tx.operationalGas,
    gasPrice: tx.gasPrice,
    gasToken: tx.gasToken,
    nonce: tx.nonce,
    r: r.toString(10),
    s: s.toString(10),
    v: vrsTx.v.toString(10)
  })

  return sendNotification(data, privateKey, accountAddress, safeAddress)
}

export const requestConfirmationResponse = (
  type,
  accountAddress,
  privateKey,
  hash,
  safeAddress,
  prefix
) => {
  const txHash = prefix
    ? EthUtil.sha3(prefix + hash + type)
    : EthUtil.toBuffer(hash)

  const vrsTxHash = EthUtil.ecsign(txHash, privateKey)
  const r = new BigNumber(EthUtil.bufferToHex(vrsTxHash.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrsTxHash.s))
  const data = JSON.stringify({
    type: type,
    hash: hash,
    r: r.toString(10),
    s: s.toString(10),
    v: vrsTxHash.v.toString(10)
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
  } catch (err) {
    console.error(err)
    return
  }

  const signedData = EthUtil.sha3('GNO' + data)
  const vrs = EthUtil.ecsign(signedData, privateKey)

  const url = getPushNotificationServiceUrl() + '/api/v1/notifications/'
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
  const body = JSON.stringify({
    devices: owners,
    message: data,
    signature: {
      r: r.toString(10),
      s: s.toString(10),
      v: vrs.v
    }
  })

  return fetch(url, {
    method: 'POST',
    headers,
    body,
    credentials: 'omit',
    referrerPolicy: 'no-referrer'
  })
}

export const getOwners = async (accountAddress, safeAddress) => {
  const contract = TruffleContract(GnosisSafe)
  const provider = new Web3.providers.HttpProvider(getNetworkUrl())
  contract.setProvider(provider)

  try {
    const instance = await contract.at(safeAddress)
    const owners = await instance.getOwners.call()
    const destOwners = owners.filter(
      (owner) => owner.toLowerCase() !== accountAddress.toLowerCase()
    )
    return destOwners.map((owner) => EthUtil.toChecksumAddress(owner))
  } catch (err) {
    console.error(err)
  }
}

export const getNonce = async (tx) => {
  if (tx.type === 'sendTransaction') {
    const estimationValue = isTokenTransfer(tx.data)
      ? '0'
      : tx.displayedValue.toString(10)
    const estimations = await getTransactionEstimations(
      tx.from,
      tx.to,
      estimationValue,
      tx.data,
      0,
      tx.gasToken
    )
    const lastUsedNonce =
      estimations.lastUsedNonce === null ? 0 : estimations.lastUsedNonce + 1

    return estimations && lastUsedNonce.toString()
  }
  return null
}
