import EthUtil from 'ethereumjs-util'
import Web3 from 'web3'
import 'babel-polyfill'
import { promisify } from 'utils/promisify'
import { getNetworkUrl } from '../../config'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const normalizeUrl = (url) => {
  var domain

  domain = url.indexOf('://') > -1 ? url.split('/')[2] : url.split('/')[0]

  domain = domain.split(':')[0]
  domain = domain.split('?')[0]

  if (domain.substr(0, 4) === 'www.') {
    domain = domain.slice(4)
  }

  return domain
}

export const shortenAddress = (address, number1, number2) => {
  if (!address) {
    return null
  }

  const checksumedAddress = EthUtil.toChecksumAddress(address)
  return (
    checksumedAddress &&
    checksumedAddress.substring(0, number1) +
      '...' +
      checksumedAddress.substring(
        checksumedAddress.length - number2,
        checksumedAddress.length
      )
  )
}

export const toGWei = (number) => {
  return number.dividedBy(1000000000000000000)
}

export const getEthBalance = async (address) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getNetworkUrl()))
  let ethBalance
  ethBalance = await promisify((cb) => web3.eth.getBalance(address, cb))
  return web3.fromWei(ethBalance, 'ether')
}

export const getPopupEnviroment = (transactions, signMessages) => {
  if (transactions.txs && transactions.txs.length > 0) {
    return 'PENDING_TRANSACTIONS'
  } else if (signMessages) {
    return 'PENDING_SIGNATURES'
  } else {
    return 'NO_POPUP'
  }
}
