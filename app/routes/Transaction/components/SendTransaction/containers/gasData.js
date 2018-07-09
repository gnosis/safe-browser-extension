import Web3 from 'web3'

import config from '../../../../../../config'
import GnosisSafePersonalEdition from '../../../../../../contracts/GnosisSafePersonalEdition.json'

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
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    to,
    value,
    data,
    operation,
  })

  return fetch(url, {
    method: 'POST',
    headers,
    body,
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch((err) => {
      console.error(err)
    })
}
