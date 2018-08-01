import Web3 from 'web3'
import fetch from 'node-fetch'
import TruffleContract from 'truffle-contract'

import config from '../../../../../../../config'
import GnosisSafePersonalEdition from '../../../../../../../contracts/GnosisSafePersonalEdition.json'

export const getGasEstimation = (
  address,
  to,
  value,
  data,
  operation
) => {
  const url = config.transactionRelayServiceUrl + 'safes/' + address + '/transactions/estimate/'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    to,
    value,
    data,
    operation
  })

  return fetch(url, {
    method: 'POST',
    headers,
    body
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch((err) => {
      console.error(err)
      return
    })
}

export const getTxHash = (tx, safeAddress) => {
  const contract = TruffleContract(GnosisSafePersonalEdition)
  const provider = new Web3.providers.HttpProvider(
    config.networks[config.currentNetwork].url
  )
  contract.setProvider(provider)

  return contract.at(safeAddress)
    .then((instance) => {
      return instance.getTransactionHash.call(
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
    })
    .then((hash) => {
      return hash
    })
    .catch((err) => {
      console.error(err)
    })
}
