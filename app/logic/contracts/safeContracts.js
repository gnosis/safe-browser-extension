import TruffleContract from 'truffle-contract'
import EthUtil from 'ethereumjs-util'
import Web3 from 'web3'
import { getTransactionEstimations } from 'routes/popup/Transaction/components/SendTransaction/containers/gasData'
import { isTokenTransfer } from 'routes/popup/Transaction/containers/tokens'
import GnosisSafe from '../../../contracts/GnosisSafe.json'
import { getNetworkUrl } from '../../../config'

export const getOwners = async (safeAddress, accountAddress) => {
  const contract = TruffleContract(GnosisSafe)
  const provider = new Web3.providers.HttpProvider(getNetworkUrl())
  contract.setProvider(provider)

  try {
    const instance = await contract.at(safeAddress)
    const owners = await instance.getOwners.call()
    const destOwners = (accountAddress)
      ? owners.filter(owner => owner.toLowerCase() !== accountAddress.toLowerCase())
      : owners

    return destOwners.map(owner => EthUtil.toChecksumAddress(owner))
  } catch (err) {
    console.error(err)
  }
}

export const getNonce = async (tx) => {
  if (tx.type === 'sendTransaction') {
    const estimationValue = isTokenTransfer(tx.data) ? '0' : tx.displayedValue.toString(10)
    const estimations = await getTransactionEstimations(tx.from, tx.to, estimationValue, tx.data, 0, tx.gasToken)
    const lastUsedNonce = (estimations.lastUsedNonce === null) ? 0 : estimations.lastUsedNonce + 1

    return estimations && lastUsedNonce.toString()
  }
  return null
}
