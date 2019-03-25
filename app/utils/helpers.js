import EthUtil from 'ethereumjs-util'

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

export const shortenAddress = (address) => {
  const checksumedAddress = address && EthUtil.toChecksumAddress(address)
  return (
    checksumedAddress &&
    checksumedAddress.substring(0, 8) +
      '...' +
      checksumedAddress.substring(
        checksumedAddress.length - 6,
        checksumedAddress.length
      )
  )
}

export const toGWei = (number) => {
  return number.dividedBy(1000000000000000000)
}
