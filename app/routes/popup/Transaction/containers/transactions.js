import Web3 from 'web3'
import BigNumber from 'bignumber.js'

import { promisify } from 'utils/promisify'
import {
  isTokenTransfer,
  getTokenData,
  getTokenBalance,
  getTokenTransferValue
} from './tokens'
import {
  ADDRESS_ZERO,
  toGWei
} from 'utils/helpers'
import { getTransactionEstimations } from '../components/SendTransaction/containers/gasData'
import { getNetworkUrl } from '../../../../../config'
import { UNKNOWN_TOKEN } from '../../../../../config/messages'

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
    const symbol = token.symbol ? token.symbol : UNKNOWN_TOKEN
    return { balance, value: val, symbol, decimals: token.decimals }
  } catch (err) {
    console.error(err)
    return { balance: new BigNumber(0), value: new BigNumber(0), symbol: UNKNOWN_TOKEN, decimals: 0 }
  }
}

export const setUpTransaction = (tx, estimations, value, decimals) => {
  if (!tx.value) {
    tx.value = '0'
  }
  tx.displayedValue = value
  tx.decimals = decimals
  if (!tx.data) {
    tx.data = '0x'
  }
  tx.safe = tx.from
  tx.operation = '0'

  if (tx.type === 'confirmTransaction' || !estimations) {
    return
  }

  tx.dataGas = new BigNumber(estimations.dataGas).toString(10)
  tx.gasPrice = new BigNumber(estimations.gasPrice).toString(10)
  tx.gasToken = estimations.gasToken
  tx.operationalGas = new BigNumber(estimations.operationalGas).toString(10)
  tx.txGas = new BigNumber(estimations.safeTxGas).toString(10)
}

export const calculateGasEstimation = async (
  tx,
  value
) => {
  let estimations
  if (tx.type === 'sendTransaction') {
    const estimationValue = isTokenTransfer(tx.data) ? '0' : value.toString(10)
    estimations = await getTransactionEstimations(tx.from, tx.to, estimationValue, tx.data, 0, tx.gasToken)
  } else {
    estimations = {
      dataGas: tx.dataGas,
      gasPrice: tx.gasPrice,
      gasToken: tx.gasToken,
      operationalGas: tx.operationalGas,
      safeTxGas: tx.txGas
    }
  }
  return estimations
}

const getTransactionFee = (estimations) => {
  BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_UP })
  const totalGas = estimations &&
    new BigNumber(estimations.dataGas)
      .plus(new BigNumber(estimations.safeTxGas))
      .plus(new BigNumber(estimations.operationalGas))
  const transactionFee = totalGas && toGWei(totalGas.times(new BigNumber(estimations.gasPrice)))
  return transactionFee
}

/*
const getTransactionTotalCost = (transaction, transactionFee, gasTokenData) => {
  let value = transaction.displayedValue

  if (isTokenTransfer(transaction.data) && transaction.displayedValue) {
    value = (transaction.gasToken && transaction.gasToken !== ADDRESS_ZERO) 
      ? transaction.displayedValue.div(10 ** gasTokenData.decimals)
      : transaction.displayedValue.div(10 ** transaction.decimals)
  }

  const totalCost = (value && transactionFee)
    ? value.plus(transactionFee)
    : null
  return totalCost
}
*/

export const getTransactionSummary = async (transaction, estimations) => {
  let gasTokenBalance
  let gasTokenSymbol
  let gasTokenData
  if (transaction.gasToken && transaction.gasToken !== ADDRESS_ZERO) {
    gasTokenData = await getTokenData(transaction.gasToken)
    gasTokenBalance = await getTokenBalance(transaction.gasToken, transaction.from, gasTokenData.decimals)
    gasTokenSymbol = gasTokenData.symbol
  } else {
    gasTokenBalance = await getEthBalance(transaction.from)
    gasTokenSymbol = 'ETH'
  }

  const transactionFee = getTransactionFee(estimations)

  // const transactionTotalCost = getTransactionTotalCost(transaction, transactionFee, gasTokenData)

  return {
    gasTokenAddress: transaction.gasToken,
    gasTokenBalance,
    gasTokenSymbol,
    transactionFee,
    // transactionTotalCost
  }
}
