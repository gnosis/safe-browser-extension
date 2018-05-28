import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import 'babel-polyfill'

import PairingProcess from './PairingProcess'
import CreateAccount from '../components/CreateAccount'
import LockedAccount from '../components/LockedAccount'
import UnlockedAccount from '../components/UnlockedAccount'
import config from '../../../../config'

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
      <PairingProcess location={location} store={mockStore} />
    ).dive().dive()

    expect(component.find('Connect(CreateAccount)')).toHaveLength(1)
  })

  test('Second pairing process with locked state', () => {
    const { account } = setUpSecondSafeLockedState()
    const mockStore = createMockStore({ account })

    const component = shallow(
      <PairingProcess location={location} store={mockStore} />
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
  test('Send notification of Safe creation from mobile app', async () => {
    const url = config.pushNotificationServiceUrl + 'notifications/'
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    const body = JSON.stringify({
      devices: ["<BROWSER_EXTENSION_ETH_ACCOUNT_ADDRESS>"],
      message: JSON.stringify({
        "safe": "<NEW_SAFE_ADDRESS>",
        "type": "safeCreation"
      }),
      signature: {
        r: "<MESSAGE_SIGNATURE>",
        s: "<MESSAGE_SIGNATURE>",
        v: <MESSAGE_SIGNATURE>
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
})
