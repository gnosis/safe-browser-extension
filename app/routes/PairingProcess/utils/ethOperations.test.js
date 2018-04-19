import EthUtil from 'ethereumjs-util'

import {
  createAccountFromMnemonic,
  generatePairingCodeContent,
  generateAllFromSeed,
} from './ethOperations'

const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
const mnemonic = 'myth like bonus scare over problem client lizard pioneer submit female collect'

describe('Ethereum operations', () => {
  test('Create Ethereum account from mnemonic', () => {
    const ethAccount = createAccountFromMnemonic(mnemonic)
    expect(ethAccount.getChecksumAddressString()).toEqual(address)
  })

  test('QR-code for the pairing process', () => {
    const ethAccount = createAccountFromMnemonic(mnemonic)
    const publicKeyAccount = ethAccount.getPublicKeyString()
    const addressAccount = ethAccount.getAddress()

    const pairingCode = JSON.parse(generatePairingCodeContent(ethAccount.getPrivateKey()))

    const data = EthUtil.sha3('GNO' + pairingCode.expirationDate)
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
