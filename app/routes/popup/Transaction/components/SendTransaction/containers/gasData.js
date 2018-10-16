import Web3 from 'web3'
import fetch from 'node-fetch'
import TruffleContract from 'truffle-contract'

import {
  getTransactionRelayServiceUrl,
  getNetworkUrl
} from '../../../../../../../config'
import GnosisSafe from '../../../../../../../contracts/GnosisSafe.json'

export const getGasEstimation = async (
  safe,
  to,
  value,
  data,
  operation
) => {
  const url = getTransactionRelayServiceUrl() + 'safes/' + safe + '/transactions/estimate/'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    safe,
    to,
    value,
    data,
    operation
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
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
      tx.gasToken || '0x0',
      tx.refundReceiver || '0x0',
      tx.nonce
    )
    return hash
  } catch (err) {
    console.error(err)
  }
}
