import fetch from 'node-fetch'
import Web3 from 'web3'
import 'babel-polyfill'
import TruffleContract from 'truffle-contract'
import HumanFriendlyToken from '@gnosis.pm/util-contracts/build/contracts/HumanFriendlyToken.json'
import StandardToken from '@gnosis.pm/util-contracts/build/contracts/StandardToken.json'
import BigNumber from 'bignumber.js'
import { promisify } from 'utils/promisify'
import { getNetworkUrl } from '../../../../../config'
import { getTokensFromRelayService } from 'utils/tokens'

const getStandardTokenContract = async () => {
  const contract = await TruffleContract(StandardToken)
  const provider = new Web3.providers.HttpProvider(getNetworkUrl())
  contract.setProvider(provider)

  return contract
}

const getHumanFriendlyToken = async () => {
  const contract = await TruffleContract(HumanFriendlyToken)
  const provider = new Web3.providers.HttpProvider(getNetworkUrl())
  contract.setProvider(provider)

  return contract
}

export const getTokenBalance = async (tokenAddress, address, decimals) => {
  try {
    const erc20Token = await getStandardTokenContract()
    const instance = await erc20Token.at(tokenAddress)
    const funds = await instance.balanceOf(address)
    const balance = !decimals ? new BigNumber(funds) : funds.div(10 ** decimals)
    return balance
  } catch (err) {
    console.error(err)
  }
}

export const isTokenTransfer = (data) => {
  return data.substring(0, 10) === '0xa9059cbb'
}

export const getTokenTransferAddress = (data) => {
  const address = '0x' + data.substring(34, 74)
  return address
}

export const getTokenTransferValue = (data) => {
  const value = new BigNumber('0x' + data.substring(74))
  return !value ? new BigNumber(0) : value
}

export const getTokenData = async (address) => {
  let tokenList = await getTokensFromRelayService()
  if (tokenList && tokenList.length > 0) {
    const filteredTokens = tokenList.filter(
      (token) => token.address.toLowerCase() === address.toLowerCase()
    )
    if (filteredTokens && filteredTokens.length > 0) {
      const token = filteredTokens[0]
      const erc20token = {
        address: token.address,
        symbol: token.symbol,
        decimals: token.decimals
      }
      return erc20token
    }
  }
  const erc20token = getNotListedTokenData(address)
  return erc20token
}

const getNotListedTokenData = async (address) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getNetworkUrl()))
  const humanErc20token = await getHumanFriendlyToken()
  const instance = await humanErc20token.at(address)

  const dataSymbol = await instance.contract.symbol.getData()
  const symbolResult = await promisify((cb) =>
    web3.eth.call({ to: address, data: dataSymbol }, cb)
  )
  const symbol = symbolResult !== '0x' ? await instance.symbol() : undefined

  const dataDecimals = await instance.contract.decimals.getData()
  const decimalsResult = await promisify((cb) =>
    web3.eth.call({ to: address, data: dataDecimals }, cb)
  )
  const decimals =
    decimalsResult !== '0x' ? `${await instance.decimals()}` : undefined

  const erc20token = {
    address,
    symbol,
    decimals
  }
  return erc20token
}
