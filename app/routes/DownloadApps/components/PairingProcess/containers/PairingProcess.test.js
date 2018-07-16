import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import 'babel-polyfill'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import PairingProcess from './PairingProcess'
import CreateAccount from '../components/CreateAccount'
import LockedAccount from '../components/LockedAccount'
import UnlockedAccount from '../components/UnlockedAccount'
import { createAccountFromMnemonic } from './pairEthAccount'
import config from '../../../../../../config'

Enzyme.configure({ adapter: new Adapter() })

const mnemonic = 'myth like bonus scare over problem client lizard pioneer submit female collect'
const account = {
  secondFA: {
    address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    seed: 'U2FsdGVkX1/PzvlOtLnvBa19Yl/wNyn+xeNJ/ZCFaPwFh+svYVUB7LSaocwBtb1tQIXandPp2A2gKj99B0uoWSigdVh4G8J1bEr+Pa6cqgPuN4nNRVhxAw+Sud+x0+8W',
    hmac: '421e3feb800198552c762254830deaadd24a84eff4600897bbe1f9282dc47563',
  }
}
const password = 'asdfasdf1'

const setUpFirstSafe = () => {
  const account = {
    secondFA: {}
  }
  const expectedAction = 'CREATE_ACCOUNT'
  return {
    account,
    expectedAction,
  }
}

const setUpSecondSafeUnlockedState = () => {
  return {
    account: {
      ...account,
      lockedState: false,
      secondFA: {
        ...account.secondFA,
        unlockedMnemonic: mnemonic,
      }
    }
  }
}

const setUpSecondSafeLockedState = () => {
  return {
    account: {
      ...account,
      lockedState: true,
    }
  }
}

describe('PairingProcess', () => {
  test('First pairing process', () => {
    const { account, expectedAction } = setUpFirstSafe()
    const mockStore = createMockStore({ account })

    const component = shallow(
      <PairingProcess password={password} store={mockStore} />
    ).dive().dive()

    expect(component.find('Connect(CreateAccount)')).toHaveLength(1)
  })

  test('Second pairing process with locked state', () => {
    const { account } = setUpSecondSafeLockedState()
    const mockStore = createMockStore({ account })

    const component = shallow(
      <PairingProcess password={password} store={mockStore} />
    ).dive().dive()

    expect(component.find('Connect(LockedAccount)')).toHaveLength(1)
  })

  test('Second pairing process with unlocked state', () => {
    const { account } = setUpSecondSafeUnlockedState()
    const mockStore = createMockStore({ account })

    const component = shallow(
      <PairingProcess store={mockStore} />
    ).dive().dive()

    expect(component.find('Connect(UnlockedAccount)')).toHaveLength(1)
  })

  /*
    test('Send safeCreation', async () => {
      const account = createAccountFromMnemonic('<MOBILE_APP_ETH_ACCOUNT_MNEMONIC>')
      console.log(account.getChecksumAddressString())
      const privateKey = account.getPrivateKey()
      const data = JSON.stringify({
        type: 'safeCreation',
        safe: '<NEW_SAFE_ADDRESS>'
      })
      const signedData = EthUtil.sha3('GNO' + data)
      const vrs = EthUtil.ecsign(signedData, privateKey)
  
      const url = config.pushNotificationServiceUrl + 'notifications/'
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
      const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
      const body = JSON.stringify({
        devices: ['<BROWSER_EXTENSION_ETH_ACCOUNT_ADDRESS>'],
        message: data,
        signature: {
          r: r.toString(10),
          s: s.toString(10),
          v: vrs.v,
        }
      })
  
      await fetch(url, {
        method: 'POST',
        headers,
        body,
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  */

  /*
    test('Send requestConfirmation', async () => {
      const account = createAccountFromMnemonic('<MOBILE_APP_ETH_ACCOUNT_MNEMONIC>')
      const privateKey = account.getPrivateKey()
      const data = JSON.stringify({
        type: 'requestConfirmation',
        hash: '<TRANSACTION_HASH>',
        safe: '<SAFE_ADDRESS>',
        to: '<TO>',
        value: '<VALUE>',
        data: '<DATA>',
        operation: '<OPERATION>',
        txGas: '<TX_GAS>',
        dataGas: '<DATA_GAS>',
        gasPrice: '<GAS_PRICE>',
        gasToken: '<GAS_TOKEN>',
        nonce: '<NONCE>'
      })
      const signedData = EthUtil.sha3('GNO' + data)
      const vrs = EthUtil.ecsign(signedData, privateKey)
  
      const url = config.pushNotificationServiceUrl + 'notifications/'
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
      const s = new BigNumber(EthUtil.bufferToHex(vrs.s))
      const body = JSON.stringify({
        devices: ['<BROWSER_EXTENSION_ETH_ACCOUNT_ADDRESS>'],
        message: data,
        signature: {
          r: r.toString(10),
          s: s.toString(10),
          v: vrs.v,
        }
      })
  
      console.log(body)
  
      await fetch(url, {
        method: 'POST',
        headers,
        body,
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  */

})
