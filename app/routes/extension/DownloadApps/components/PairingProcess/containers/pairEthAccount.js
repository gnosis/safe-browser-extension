import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'
import HdKey from 'ethereumjs-wallet/hdkey'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

export const createAccountFromMnemonic = (mnemonic) => {
  const seed = Bip39.mnemonicToSeed(mnemonic)
  const hdWallet = HdKey.fromMasterSeed(seed)
  const walletHdPath = 'm/44\'/60\'/0\'/0'
  const newAccount = hdWallet.derivePath(walletHdPath + '/0').getWallet()
  return newAccount
}

export const createEthAccount = (mnemonic, password) => {
  const encryptedMnemonic = CryptoJs.AES.encrypt(mnemonic, password).toString()
  const hmac = CryptoJs.HmacSHA256(encryptedMnemonic, CryptoJs.SHA256(password)).toString()

  return {
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
  const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
  const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
  const pairingCodeContent = JSON.stringify({
    expirationDate: formatedExpirationDate,
    signature: {
      r: r.toString(10),
      s: s.toString(10),
      v: vrs.v
    }
  })
  return pairingCodeContent
}
