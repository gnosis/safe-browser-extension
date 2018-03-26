import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CreatePassword from './containers/CreatePassword'

Enzyme.configure({ adapter: new Adapter() })

describe('Create Password Form Validation', () => {

  test('validateLength: It should return true if the password has minimum 8 characters', () => {
    const password = 'qwertyui'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateLength(password)
    expect(component.state().error.length).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateLenght: It should return false if the password has less than 8 characters', () => {
    const password = 'qwe'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateLength(password)
    expect(component.state().error.length).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validateNumber: It should return true if the password has minimum 1 number', () => {
    const password = 'qwe1'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateNumber(password)
    expect(component.state().error.number).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateNumber: It should return false if the password has no numbers', () => {
    const password = 'qwe'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateNumber(password)
    expect(component.state().error.number).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validateLetter: It should return true if the password has minimum 1 letter', () => {
    const password = 'q'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateLetter(password)
    expect(component.state().error.letter).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateLetter: It should return false if the password has no letters', () => {
    const password = '12345'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateLetter(password)
    expect(component.state().error.letter).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validateRow: It should return true if the password has no more than 2 identical characters', () => {
    const password = 'qwerrty123'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateRow(password)
    expect(component.state().error.row).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateRow: It should return false if the password has more more than 2 identical characters', () => {
    const password = 'qwerrrty123'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    const result = component.instance().validateRow(password)
    expect(component.state().error.row).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validatePasswords: It should return true if the password meets all the requirements', () => {
    const password = 'qwerrty123'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    component.instance().validatePassword(password)
    expect(component.state().continue).toEqual(true)
  })

  test('validatePasswords: It should return false if the password doesn\'t meet all the requirements', () => {
    const password = 'qwerrrty123'
    const props = {
      location: {
        state: {}
      },
    }
    const component = shallow(<CreatePassword {...props} />)
    component.instance().validatePassword(password)
    expect(component.state().continue).toEqual(false)
  })
})
