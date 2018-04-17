import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import CryptoJs from 'crypto-js'

import PairingProcess from './containers/PairingProcess'
import { createAccountFromMnemonic } from './utils/ethOperations'

Enzyme.configure({ adapter: new Adapter() })

const setUpFirst2FA = () => {
  const account = {
    secondFA: {}
  }
  const location = {
    state: {
      password: 'asdfasdf1'
    }
  }
  const expectedAction = 'CREATE_2FA_ACCOUNT'
  return {
    account,
    location,
    expectedAction,
  }
}

const setUpSecond2FA = () => {
  const account = {
    secondFA: {
      address: '0xA062f8F08B3f253316D5CA053D061EDD4D005709',
      seed: 'U2FsdGVkX1/AMIIGahCw+aLim03kvkgKujGLLWJx/ndOclNRAq7Oy0bVl8ZUdQNmv9A7aGb5Xtn7ZMVVnVTMzFiXQWlH4YbWmKw9qBRZ7CIMS2zcfP9/H6tUC18BLMPP',
      hmac: '7cb237d2dbb768da19214ea332a73280250c52a14cc7c0091067e0ff7e2a93b3'
    }
  }
  const location = {
    state: {
      password: 'asdfasdf1'
    }
  }
  return {
    account,
    location,
  }
}

describe('Pairing Process', () => {
  describe('Component tests', () => {
    test('First pairing process for 2FA account', () => {
      const { account, location, expectedAction } = setUpFirst2FA()

      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />
      ).dive()

      expect(mockStore.getActions().length).toBe(1)
      expect(mockStore.getActions()[0].type).toEqual(expectedAction)
    })

    test('Second pairing process for 2FA account', () => {
      const { account, location } = setUpSecond2FA()

      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />
      ).dive()

      expect(mockStore.getActions().length).toBe(0)
    })
  })

  describe('Unit tests', () => {
    test('createEthAccount: first 2FA', () => {
      const { account, location, expectedAction } = setUpFirst2FA()

      const mockStore = createMockStore({ account })

      const mnemonic = 'saddle other tent fault company disagree wash wait elbow pitch stove tray'
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

    test('getEthAccount: second 2FA', () => {
      const { account, location } = setUpSecond2FA()

      const mockStore = createMockStore({ account })

      const component = shallow(
        <PairingProcess location={location} store={mockStore} />,
        { disableLifecycleMethods: true }
      ).dive()
      const currentAccount = component.instance().getEthAccount(
        location.state.password,
      )

      expect(mockStore.getActions().length).toBe(0)
      expect(currentAccount.getChecksumAddressString()).toEqual(account.secondFA.address)
    })
  })
})
