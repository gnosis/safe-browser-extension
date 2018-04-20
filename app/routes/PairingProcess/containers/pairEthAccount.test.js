import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import CryptoJs from 'crypto-js'
import EthUtil from 'ethereumjs-util'

import {
  createEthAccount,
  getDecryptedEthAccount,
  getUnencryptedEthAccount,
  createAccountFromMnemonic,
  generatePairingCodeContent,
} from './pairEthAccount'

Enzyme.configure({ adapter: new Adapter() })

const password = 'asdfasdf1'
const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
const mnemonic = 'myth like bonus scare over problem client lizard pioneer submit female collect'
const seed = 'U2FsdGVkX1/PzvlOtLnvBa19Yl/wNyn+xeNJ/ZCFaPwFh+svYVUB7LSaocwBtb1tQIXandPp2A2gKj99B0uoWSigdVh4G8J1bEr+Pa6cqgPuN4nNRVhxAw+Sud+x0+8W'
const hmac = '421e3feb800198552c762254830deaadd24a84eff4600897bbe1f9282dc47563'

const account = {
  secondFA: { address, seed, hmac }
}

const setUpFirstSafe = () => {
  return {
    ...account,
    lockedState: true,
    secondFA: {}
  }
}

const setUpSecondSafeUnlockedState = () => {
  return {
    ...account,
    lockedState: false,
    secondFA: {
      ...account.secondFA,
      unlockedSeed: mnemonic,
    }
  }
}

const setUpSecondSafeLockedState = () => {
  return {
    ...account,
    lockedState: true,
  }
}

describe('pairEthAccount', () => {
  test('Create Ethereum account from mnemonic', () => {
    const ethAccount = createAccountFromMnemonic(mnemonic)
    expect(ethAccount.getChecksumAddressString()).toEqual(address)
  })

  test('Create Ethereum account before connecting the first Safe', () => {
    const createdAccount = createAccountFromMnemonic(mnemonic)
    const {
      currentAccount,
      encryptedMnemonic,
      hmac
    } = createEthAccount(mnemonic, password)

    expect(currentAccount).toEqual(createdAccount)
    const decryptedHmac = CryptoJs.HmacSHA256(
      encryptedMnemonic,
      CryptoJs.SHA256(password)
    ).toString()
    expect(decryptedHmac).toEqual(hmac)
  })

  test('Get decrypted Ethereum account before connecting the second Safe', () => {
    const localAccount = setUpSecondSafeLockedState()

    const currentAccount = getDecryptedEthAccount(localAccount.secondFA.seed, password)

    expect(currentAccount.getChecksumAddressString()).toEqual(localAccount.secondFA.address)
  })

  test('Get unencrypted Ethereum account before connecting the second Safe', () => {
    const localAccount = setUpSecondSafeUnlockedState()

    const currentAccount = getUnencryptedEthAccount(
      localAccount.secondFA.unlockedSeed
    )

    expect(currentAccount.getChecksumAddressString()).toEqual(localAccount.secondFA.address)
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
