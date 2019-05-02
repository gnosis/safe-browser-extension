import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CryptoJs from 'crypto-js'
import EthUtil from 'ethereumjs-util'
import Web3 from 'web3'

import {
  createEthAccount,
  getDecryptedEthAccount,
  createAccountFromMnemonic,
  generatePairingCodeContent
} from './pairEthAccount'
const web3 = new Web3()

Enzyme.configure({ adapter: new Adapter() })

const password = 'asdfasdf1'
const address = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
const address1 = '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0'


const mnemonic =
  'myth like bonus scare over problem client lizard pioneer submit female collect'
const seed =
  'U2FsdGVkX1/PzvlOtLnvBa19Yl/wNyn+xeNJ/ZCFaPwFh+svYVUB7LSaocwBtb1tQIXandPp2A2gKj99B0uoWSigdVh4G8J1bEr+Pa6cqgPuN4nNRVhxAw+Sud+x0+8W'
const hmac = '421e3feb800198552c762254830deaadd24a84eff4600897bbe1f9282dc47563'

const setUpSecondSafeUnlockedState = () => {
  return {
    lockedState: false,
    secondFA: {
      address,
      seed,
      hmac,
      unlockedMnemonic: mnemonic,
      currentAccountIndex: 0
    }
  }
}

const setUpSecondSafeLockedState = () => {
  return {
    secondFA: {
      address,
      seed,
      hmac,
      currentAccountIndex: 0
    },
    lockedState: true
  }
}

describe('pairEthAccount', () => {
  test('Create Ethereum account from mnemonic', () => {
    const ethAccount = createAccountFromMnemonic(mnemonic, 0)
    expect(ethAccount.getChecksumAddressString()).toEqual(address)
  })

  test('Create Ethereum account before connecting the first Safe', () => {
    const { encryptedMnemonic, hmac } = createEthAccount(mnemonic, password)

    const decryptedHmac = CryptoJs.HmacSHA256(
      encryptedMnemonic,
      CryptoJs.SHA256(password)
    ).toString()
    expect(decryptedHmac).toEqual(hmac)
  })

  test('Get decrypted Ethereum account before connecting the second Safe', () => {
    const localAccount = setUpSecondSafeLockedState()

    const currentAccount = getDecryptedEthAccount(
      localAccount.secondFA.seed,
      password,
      0
    )

    expect(currentAccount.getChecksumAddressString()).toEqual(
      localAccount.secondFA.address
    )
  })

  test('Get unencrypted Ethereum account before connecting the second Safe', () => {
    const localAccount = setUpSecondSafeUnlockedState()

    const currentAccount = createAccountFromMnemonic(
      localAccount.secondFA.unlockedMnemonic,
      0
    )

    expect(currentAccount.getChecksumAddressString()).toEqual(
      localAccount.secondFA.address
    )
  })

  test('QR-code for the pairing process', () => {
    const ethAccount = createAccountFromMnemonic(mnemonic, 0)
    const publicKeyAccount = ethAccount.getPublicKeyString()
    const addressAccount = ethAccount.getAddress()

    const pairingCode = JSON.parse(
      generatePairingCodeContent(ethAccount.getPrivateKey())
    )

    const data = EthUtil.sha3('GNO' + pairingCode.expirationDate)
    const publicKeyCode = EthUtil.bufferToHex(
      EthUtil.ecrecover(
        data,
        EthUtil.bufferToHex(pairingCode.signature.v),
        web3.toHex(pairingCode.signature.r),
        web3.toHex(pairingCode.signature.s)
      )
    )
    const addressCode = EthUtil.pubToAddress(publicKeyCode)

    expect(publicKeyCode).toEqual(publicKeyAccount)
    expect(addressCode).toEqual(addressAccount)
  })
})
