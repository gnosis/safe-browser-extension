import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import ConnectionType from './containers/ConnectionType'

Enzyme.configure({ adapter: new Adapter() })

describe('Connection Type', () => {

  test('It should return true if exists an account', () => {
    const mockStore = createMockStore({
      account: {
        secondFA: { connectionType: '2FA' }
      }
    })
    const component = shallow(<ConnectionType store={mockStore} />).dive()
    const result = component.instance().exists2FAAccount()
    expect(result).toEqual(true)
  })

  test('It should return false if doesn\'t exist any 2FA account', () => {
    const mockStore = createMockStore({
      account: {
        relayer: { connectionType: 'RELAYER' }
      }
    })
    const component = shallow(<ConnectionType store={mockStore} />).dive()
    const result = component.instance().exists2FAAccount()
    expect(result).toEqual(false)
  })

  test('It should return false if doesn\'t exist any account', () => {
    const mockStore = createMockStore({
      account: {}
    })
    const component = shallow(<ConnectionType store={mockStore} />).dive()
    const result = component.instance().exists2FAAccount()
    expect(result).toEqual(false)
  })
})
