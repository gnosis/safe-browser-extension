import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'
import HdKey from 'ethereumjs-wallet/hdkey'
import EthUtil from 'ethereumjs-util'
import Web3 from 'web3'
const web3 = new Web3()

export const createAccountFromMnemonic = (mnemonic) => {
  const seed = Bip39.mnemonicToSeed(mnemonic)
  const hdWallet = HdKey.fromMasterSeed(seed)
  const walletHdPath = 'm/44\'/60\'/0\'/0'
  const newAccount = hdWallet.derivePath(walletHdPath + '/0').getWallet()
  return newAccount
}

export const createEthAccount = (mnemonic, password) => {
  const currentAccount = createAccountFromMnemonic(mnemonic)
  const encryptedMnemonic = CryptoJs.AES.encrypt(mnemonic, password).toString()
  const hmac = CryptoJs.HmacSHA256(encryptedMnemonic, CryptoJs.SHA256(password)).toString()

  return {
    currentAccount,
    encryptedMnemonic,
    hmac
  }
}

export const getDecryptedEthAccount = (encryptedMnemonic, password) => {
  const mnemonic = CryptoJs.AES.decrypt(encryptedMnemonic, password).toString(CryptoJs.enc.Utf8)

  return createAccountFromMnemonic(mnemonic)
}

export const getUnencryptedEthAccount = (mnemonic) => {
  return createAccountFromMnemonic(mnemonic)
}

export const generatePairingCodeContent = (privateKey) => {
  const startDate = new Date()
  const expirationDate = new Date(startDate.setMinutes(startDate.getMinutes() + 10))
  const formatedExpirationDate = expirationDate.toISOString().split('.')[0] + '+00:00'

  const data = EthUtil.sha3('GNO' + formatedExpirationDate)
  const vrs = EthUtil.ecsign(data, privateKey)
  const pairingCodeContent = JSON.stringify({
    expirationDate: formatedExpirationDate,
    signature: {
      v: vrs.v,
      r: web3.toBigNumber(EthUtil.bufferToHex(vrs.r)).toString(10),
      s: web3.toBigNumber(EthUtil.bufferToHex(vrs.s)).toString(10),
    }
  })
  return pairingCodeContent
}
