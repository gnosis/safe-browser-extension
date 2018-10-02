import Web3 from 'web3'
import BigNumber from 'bignumber.js'

import { promisify } from 'utils/promisify'
import {
  isTokenTransfer,
  getTokenData,
  getTokenBalance,
  getTokenTransferValue
} from './tokens'
import config from '../../../../../config'

export const getEthBalance = async (address) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(config.networks[config.currentNetwork].url))
  let ethBalance
  ethBalance = await promisify(cb => web3.eth.getBalance(address, cb))
  return web3.fromWei(ethBalance, 'ether')
}

export const getTransactionAddressData = async (to, from, data, value, ethBalance) => {
  if (!isTokenTransfer(data)) {
    const val = (value) ? new BigNumber(value).toString(10) : '0'
    return { balance: ethBalance, value: val, symbol: 'ETH' }
  }

  try {
    const token = await getTokenData(to)
    const balance = await getTokenBalance(token.address, from, token.decimals)
    const val = getTokenTransferValue(data)
    const symbol = token.symbol ? token.symbol : 'UNKNOWN TOKEN'
    return { balance, value: val, symbol }
  } catch (err) {
    console.error(err)
    return { balance: new BigNumber(0), value: 0, symbol: 'UNKNOWN TOKEN' }
  }
}

export const setUpTransaction = (transaction, estimations) => {
  if (!transaction.value) { transaction.value = '0' }
  if (!transaction.data) { transaction.data = '0x' }
  transaction.safe = transaction.from
  transaction.operation = '0'

  if (!estimations) return
  transaction.txGas = new BigNumber(estimations.safeTxGas).toString(10)
  transaction.dataGas = new BigNumber(estimations.dataGas).toString(10)
  transaction.gasPrice = new BigNumber(estimations.gasPrice).toString(10)
  transaction.gasToken = estimations.gasToken
}
