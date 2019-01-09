import Web3 from 'web3'
import fetch from 'node-fetch'
import TruffleContract from 'truffle-contract'

import {
  getTransactionRelayServiceUrl,
  getNetworkUrl
} from '../../../../../../../config'
import { ADDRESS_ZERO } from 'utils/helpers'
import GnosisSafe from '../../../../../../../contracts/GnosisSafe.json'

export const getTransactionEstimations = async (
  safe,
  to,
  value,
  data,
  operation,
  gasToken
) => {
  const url = getTransactionRelayServiceUrl() + 'safes/' + safe + '/transactions/estimate/'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const body = {
    safe,
    to,
    value,
    data,
    operation
  }
  if (gasToken) {
    body.gasToken = gasToken
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    })
    return (response && response.status === 200)
      ? response.json()
      : null
  } catch (err) {
    console.error(err)
  }
}

export const getTxHash = async (tx) => {
  const contract = TruffleContract(GnosisSafe)
  const provider = new Web3.providers.HttpProvider(getNetworkUrl())
  contract.setProvider(provider)

  const safeAddress = tx.from
  try {
    const instance = await contract.at(safeAddress)
    const hash = await instance.getTransactionHash.call(
      tx.to,
      tx.value,
      tx.data,
      tx.operation,
      tx.txGas,
      tx.dataGas,
      tx.gasPrice,
      tx.gasToken || ADDRESS_ZERO,
      tx.refundReceiver || ADDRESS_ZERO,
      tx.nonce
    )
    return hash
  } catch (err) {
    console.error(err)
  }
}
