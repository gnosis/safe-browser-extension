import EthUtil from 'ethereumjs-util'

import {
  createAccountFromMnemonic,
  generatePairingCodeContent,
} from './ethOperations'

describe('Ethereum operations', () => {

  test('Create Ethereum account from mnemonic', () => {
    const mnemonic = 'saddle other tent fault company disagree wash wait elbow pitch stove tray'
    const address = '0xC04d5D48A08aAB957D67B62A4A85040a22d5DA41'

    const ethAccount = createAccountFromMnemonic(mnemonic)
    expect(ethAccount.getChecksumAddressString()).toEqual(address)
  })

  test('QR-code for the pairing process', () => {
    const mnemonic = 'saddle other tent fault company disagree wash wait elbow pitch stove tray'
    const ethAccount = createAccountFromMnemonic(mnemonic)
    const publicKeyAccount = ethAccount.getPublicKeyString()
    const addressAccount = ethAccount.getAddress()

    const pairingCode = JSON.parse(generatePairingCodeContent(ethAccount.getPrivateKey()))

    const data = EthUtil.sha3('ns' + pairingCode.expiryDate)
    const publicKeyCode = EthUtil.bufferToHex(
      EthUtil.ecrecover(
        data,
        EthUtil.bufferToHex(pairingCode.signature.v),
        pairingCode.signature.r,
        pairingCode.signature.s
      )
    )
    const addressCode = EthUtil.pubToAddress(publicKeyCode)

    expect(publicKeyCode).toEqual(publicKeyAccount)
    expect(addressCode).toEqual(addressAccount)
  })
})
