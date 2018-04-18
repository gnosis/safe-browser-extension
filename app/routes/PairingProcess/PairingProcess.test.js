import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import CryptoJs from 'crypto-js'

import PairingProcess from './containers/PairingProcess'
import { createAccountFromMnemonic } from './utils/ethOperations'

Enzyme.configure({ adapter: new Adapter() })

const mnemonic = 'myth like bonus scare over problem client lizard pioneer submit female collect'
const account = {
  secondFA: {
    address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    seed: 'U2FsdGVkX1/PzvlOtLnvBa19Yl/wNyn+xeNJ/ZCFaPwFh+svYVUB7LSaocwBtb1tQIXandPp2A2gKj99B0uoWSigdVh4G8J1bEr+Pa6cqgPuN4nNRVhxAw+Sud+x0+8W',
    hmac: '421e3feb800198552c762254830deaadd24a84eff4600897bbe1f9282dc47563',
  }
}
const location = {
  state: {
    password: 'asdfasdf1'
  }
}

const setUpFirstSafe = () => {
  const account = {
    secondFA: {}
  }
  const expectedAction = 'CREATE_ACCOUNT'
  return {
    account,
    location,
    expectedAction,
  }
}

const setUpSecondSafeUnlockedState = () => {
  const newAccount = {
    ...account,
    lockedState: false,
    secondFA: {
      ...account.secondFA,
      unencryptedSeed: mnemonic,
    }
  }
  return {
    account: newAccount,
    location,
  }
}

const setUpSecondSafeLockedState = () => {
  return {
    account,
    location,
  }
}

describe('Pairing Process', () => {
  describe('Component tests', () => {
    test('First pairing process', () => {
      const { account, location, expectedAction } = setUpFirstSafe()
      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />
      ).dive()

      expect(mockStore.getActions().length).toBe(1)
      expect(mockStore.getActions()[0].type).toEqual(expectedAction)
    })

    test('Second pairing process with locked state', () => {
      const { account, location } = setUpSecondSafeLockedState()
      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />
      ).dive()

      expect(mockStore.getActions().length).toBe(0)
    })

    test('Second pairing process with unlocked state', () => {
      const { account, location } = setUpSecondSafeUnlockedState()
      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />
      ).dive()

      expect(mockStore.getActions().length).toBe(0)
    })
  })

  describe('Unit tests', () => {
    test('createEthAccount: first Safe', () => {
      const { account, location, expectedAction } = setUpFirstSafe()
      const mockStore = createMockStore({ account })
      const createdAccount = createAccountFromMnemonic(mnemonic)

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />,
        { disableLifecycleMethods: true }
      ).dive()
      const currentAccount = component.instance().createEthAccount(
        location.state.password,
        mnemonic,
        createdAccount,
      )

      expect(createdAccount).toEqual(currentAccount)
      expect(mockStore.getActions().length).toBe(1)
      const action = mockStore.getActions()[0]
      expect(action.type).toEqual(expectedAction)
      expect(action.address).toEqual(currentAccount.getChecksumAddressString())

      const decryptedHmac = CryptoJs.HmacSHA256(
        action.seed,
        CryptoJs.SHA256(location.state.password)
      ).toString()
      expect(decryptedHmac).toEqual(action.hmac)
    })

    test('getDecryptedEthAccount: second Safe', () => {
      const { account, location } = setUpSecondSafeLockedState()
      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />,
        { disableLifecycleMethods: true }
      ).dive()
      const currentAccount = component.instance().getDecryptedEthAccount(
        location.state.password
      )

      expect(mockStore.getActions().length).toBe(0)
      expect(currentAccount.getChecksumAddressString()).toEqual(account.secondFA.address)
    })

    test('getUnencryptedEthAccount: second Safe', () => {
      const { account, location } = setUpSecondSafeUnlockedState()
      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />,
        { disableLifecycleMethods: true }
      ).dive()
      const currentAccount = component.instance().getUnencryptedEthAccount(
        mockStore.getState().account.secondFA.unencryptedSeed
      )

      expect(mockStore.getActions().length).toBe(0)
      expect(currentAccount.getChecksumAddressString()).toEqual(account.secondFA.address)
    })
  })
})
