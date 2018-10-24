import Web3 from 'web3'
import BigNumber from 'bignumber.js'

import { promisify } from 'utils/promisify'
import {
  isTokenTransfer,
  getTokenData,
  getTokenBalance,
  getTokenTransferValue
} from './tokens'
import { getTransactionEstimations } from '../components/SendTransaction/containers/gasData'
import { getNetworkUrl } from '../../../../../config'

export const getEthBalance = async (address) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getNetworkUrl()))
  let ethBalance
  ethBalance = await promisify(cb => web3.eth.getBalance(address, cb))
  return web3.fromWei(ethBalance, 'ether')
}

export const getTransactionData = async (to, from, data, value, ethBalance) => {
  if (!isTokenTransfer(data)) {
    const val = (value) ? new BigNumber(value) : new BigNumber(0)
    return { balance: ethBalance, value: val, symbol: 'ETH', decimals: 18 }
  }

  try {
    const token = await getTokenData(to)
    const balance = await getTokenBalance(token.address, from, token.decimals)
    const val = getTokenTransferValue(data, token.decimals)
    const symbol = token.symbol ? token.symbol : 'UNKNOWN TOKEN'
    return { balance, value: val, symbol, decimals: token.decimals }
  } catch (err) {
    console.error(err)
    return { balance: new BigNumber(0), value: new BigNumber(0), symbol: 'UNKNOWN TOKEN', decimals: 0 }
  }
}

export const setUpTransaction = (tx, estimations, displayedValue, decimals) => {
  if (!tx.value) {
    tx.value = '0'
  }
  tx.displayedValue = displayedValue
  tx.decimals = decimals
  if (!tx.data) {
    tx.data = '0x'
  }
  tx.safe = tx.from
  tx.operation = '0'

  if (tx.type === 'confirmTransaction' || !estimations) {
    return
  }

  tx.txGas = new BigNumber(estimations.safeTxGas).toString(10)
  tx.dataGas = new BigNumber(estimations.dataGas).toString(10)
  tx.gasPrice = new BigNumber(estimations.gasPrice).toString(10)
  tx.gasToken = estimations.gasToken
}

export const calculateGasEstimation = async (
  tx,
  value
) => {
  let estimations
  if (tx.type === 'sendTransaction') {
    const estimationValue = isTokenTransfer(tx.data) ? '0' : value.toString(10)
    estimations = await getTransactionEstimations(tx.from, tx.to, estimationValue, tx.data, 0)
  } else {
    estimations = {
      safeTxGas: tx.txGas,
      dataGas: tx.dataGas,
      gasPrice: tx.gasPrice,
      gasToken: tx.gasToken
    }
  }
  return estimations
}
