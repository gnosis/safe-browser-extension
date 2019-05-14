import EthUtil from 'ethereumjs-util'
import {
  getOwners,
  getThreshold,
  isValidSignature
} from 'logic/contracts/safeContracts'
import SignTypedDataEip712 from '../containers/SignTypedDataEip712'
import Web3 from 'web3'
const web3 = new Web3()

export const getSignaturesOwnersRatio = async (ethAccount, signMessages) => {
  if (ethAccount) {
    try {
      const safeAddress = signMessages.message[3]
      const owners = await getOwners(safeAddress)
      const threshold = await getThreshold(safeAddress)
      return {
        owners,
        threshold
      }
    } catch (err) {
      console.error(err)
      return {
        owners: [],
        threshold: undefined
      }
    }
  }
}

export const compareOwnerSignatures = (a, b) => {
  const addressA = EthUtil.toChecksumAddress(a.address)
  const addressB = EthUtil.toChecksumAddress(b.address)
  if (addressA < addressB) {
    return -1
  }
  if (addressA > addressB) {
    return 1
  }
  return 0
}

export const getOwnerFromSignature = (signedMessage, signature) => {
  try {
    const signedMessageBuffer = Buffer.from(signedMessage.slice(2), 'hex')
    const publicKeyCode = EthUtil.bufferToHex(
      EthUtil.ecrecover(
        signedMessageBuffer,
        EthUtil.bufferToHex(signature.v),
        web3.toHex(signature.r),
        web3.toHex(signature.s)
      )
    )
    const addressCode = EthUtil.pubToAddress(publicKeyCode)
    return EthUtil.bufferToHex(addressCode)
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getEip712MessageHash = (message, safeAddress) => {
  const signTypedDataEip712 = new SignTypedDataEip712()
  const hexEip712Hash = signTypedDataEip712.eip712Hash(JSON.parse(message))
  return hexEip712Hash
}

export const signMessageByExtension = (messageHash, ethAccount) => {
  const data = Buffer.from(messageHash.slice(2), 'hex')
  const vrs = EthUtil.ecsign(data, ethAccount.getPrivateKey())
  const r = EthUtil.bufferToHex(vrs.r).slice(2)
  const s = EthUtil.bufferToHex(vrs.s).slice(2)
  const v = EthUtil.bufferToHex(vrs.v).slice(2)
  return { r, s, v }
}

export const createWalletSignature = async (ownerSignatures, message, safeAddress) => {
  ownerSignatures.sort(compareOwnerSignatures)
  const walletSignature = '0x' + ownerSignatures.map(
    ownerSignature => ownerSignature.signature.slice(2)
  ).join('')

  const hexEip712Hash = getEip712MessageHash(message, safeAddress)
  const validSignature = await isValidSignature(safeAddress, hexEip712Hash, walletSignature)
  return (validSignature) ? walletSignature : null
}
