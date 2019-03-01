import EthUtil from 'ethereumjs-util'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const normalizeUrl = (url) => {
  let domain = new URL(url)
  if (domain.protocol === 'http:' || domain.protocol === 'https:') {
    const normalizedDomain = domain.hostname
    if (normalizedDomain.substr(0, 4) === 'www.') {
      return normalizedDomain.slice(4)
    } else {
      return normalizedDomain
    }
  } else if (domain.protocol === 'file:') {
    return domain.href
  } else {
    return domain.hostname
  }
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
