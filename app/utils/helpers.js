import EthUtil from 'ethereumjs-util'

export const normalizeUrl = (url) => {
  var domain

  domain = (url.indexOf('://') > -1)
    ? url.split('/')[2]
    : url.split('/')[0]

  domain = domain.split(':')[0]
  domain = domain.split('?')[0]

  if (domain.substr(0, 4) === 'www.') { domain = domain.slice(4) }

  return domain
}

export const shortenAddress = (address) => {
  const checksumedAddress = address && EthUtil.toChecksumAddress(address)
  return checksumedAddress &&
    checksumedAddress.substring(0, 8) +
    '...' +
    checksumedAddress.substring(checksumedAddress.length - 6, checksumedAddress.length)
}

export const toGWei = (number) => {
  return number.dividedBy(1000000000000000000)
}

export const getPopupEnviroment = (transactions, enabledDapps) => {
  if (transactions.txs && transactions.txs.length > 0) {
    return 'PENDING_TRANSACTIONS'
  } else if (enabledDapps.providerRequest) {
    return 'PENDING_ENABLED_DAPP'
  } else {
    return 'NO_POPUP'
  }
}
