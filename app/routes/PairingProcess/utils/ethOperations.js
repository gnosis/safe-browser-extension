import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import EthUtil from 'ethereumjs-util'
import CryptoJs from 'crypto-js'

export const createAccountFromMnemonic = (mnemonic) => {
  const seed = Bip39.mnemonicToSeed(mnemonic)
  const hdWallet = HdKey.fromMasterSeed(seed)
  const walletHdPath = 'm/44\'/60\'/0\'/0'
  const newAccount = hdWallet.derivePath(walletHdPath + '/0').getWallet()
  return newAccount
}

export const generatePairingCodeContent = (privateKey) => {
  const startDate = new Date()
  const expiryDate = new Date(startDate.setMinutes(startDate.getMinutes() + 10))

  const data = EthUtil.sha3('ns' + expiryDate.toISOString())
  const vrs = EthUtil.ecsign(data, privateKey)
  const pairingCodeContent = JSON.stringify({
    expiryDate: expiryDate.toISOString(),
    signature: {
      v: vrs.v,
      r: EthUtil.bufferToHex(vrs.r),
      s: EthUtil.bufferToHex(vrs.s)
    }
  })
  return pairingCodeContent
}
