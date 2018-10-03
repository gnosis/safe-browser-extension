import Web3 from 'web3'
import fetch from 'node-fetch'
import TruffleContract from 'truffle-contract'

import config from '../../../../../../../config'
import GnosisSafePersonalEdition from '../../../../../../../contracts/GnosisSafePersonalEdition.json'

export const getGasEstimation = async (
  safe,
  to,
  value,
  data,
  operation
) => {
  const url = config.transactionRelayServiceUrl + 'safes/' + safe + '/transactions/estimate/'
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

export const getTxHash = async (tx, safeAddress) => {
  const contract = TruffleContract(GnosisSafePersonalEdition)
  const provider = new Web3.providers.HttpProvider(
    config.networks[config.currentNetwork].url
  )
  contract.setProvider(provider)

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
      tx.gasToken,
      tx.nonce
    )
    return hash
  } catch (err) {
    console.error(err)
  }
}
