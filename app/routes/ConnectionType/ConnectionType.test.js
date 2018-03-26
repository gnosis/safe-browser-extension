import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createMockStore } from 'redux-test-utils'
import ConnectionType from './containers/ConnectionType'

Enzyme.configure({ adapter: new Adapter() })

describe('Connection Type', () => {

  test('It should return true if exists an account', () => {
    const mockStore = createMockStore({
      account: { seed: "seed" }
    })
    const component = shallow(<ConnectionType store={mockStore} />).dive()
    const result = component.instance().existsAccount()
    expect(result).toEqual(true)
  })

  test('It should return false if doesn\'t exist any account', () => {
    const mockStore = createMockStore({
      account: {}
    })
    const component = shallow(<ConnectionType store={mockStore} />).dive()
    const result = component.instance().existsAccount()
    expect(result).toEqual(false)
  })
})
