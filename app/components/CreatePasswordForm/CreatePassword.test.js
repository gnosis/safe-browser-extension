import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CreatePasswordForm from './containers/CreatePasswordForm'

Enzyme.configure({ adapter: new Adapter() })

const manageCreatePassword = jest.fn()

describe('Create Password Form Validation', () => {

  test('validateLength: It should return true if the password has minimum 8 characters', () => {
    const password = 'qwertyui'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateLength(password)
    expect(component.state().error.length).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateLength: It should return false if the password has less than 8 characters', () => {
    const password = 'qwe'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateLength(password)
    expect(component.state().error.length).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validateNumber: It should return true if the password has minimum 1 number', () => {
    const password = 'qwe1'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateNumber(password)
    expect(component.state().error.number).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateNumber: It should return false if the password has no numbers', () => {
    const password = 'qwe'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateNumber(password)
    expect(component.state().error.number).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validateLetter: It should return true if the password has minimum 1 letter', () => {
    const password = 'q'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateLetter(password)
    expect(component.state().error.letter).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateLetter: It should return false if the password has no letters', () => {
    const password = '12345'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateLetter(password)
    expect(component.state().error.letter).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validateRow: It should return true if the password has no more than 2 identical characters', () => {
    const password = 'qwerrty123'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateRow(password)
    expect(component.state().error.row).toEqual(true)
    expect(result).toEqual(true)
  })

  test('validateRow: It should return false if the password has more more than 2 identical characters', () => {
    const password = 'qwerrrty123'
    const props = {
      password
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    const result = component.instance().validateRow(password)
    expect(component.state().error.row).toEqual(false)
    expect(result).toEqual(false)
  })

  test('validatePasswords: It should return true if the password meets all the requirements', () => {
    const newPassword = 'qwerty123'
    const props = {
      newPassword: '',
      manageCreatePassword,
    }

    const component = shallow(<CreatePasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })
    
    expect(manageCreatePassword).toHaveBeenCalled()
    expect(component.state().error.length).toEqual(true)
    expect(component.state().error.number).toEqual(true)
    expect(component.state().error.letter).toEqual(true)
    expect(component.state().error.row).toEqual(true)
  })

  test('validatePasswords: It should return false if the password doesn\'t meet all the requirements', () => {
    const newPassword = ''
    const props = {
      newPassword: '',
      manageCreatePassword,
    }

    const component = shallow(<CreatePasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })
    
    expect(manageCreatePassword).toHaveBeenCalled()
    expect(component.state().error.length).toEqual(false)
    expect(component.state().error.number).toEqual(false)
    expect(component.state().error.letter).toEqual(false)
    expect(component.state().error.row).toEqual(false)
  })

  test('validatePasswords: It should return false if the password doesn\'t meet all the requirements', () => {
    const newPassword = 'aa'
    const props = {
      newPassword: '',
      manageCreatePassword,
    }

    const component = shallow(<CreatePasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })
    
    expect(manageCreatePassword).toHaveBeenCalled()
    expect(component.state().error.length).toEqual(false)
    expect(component.state().error.number).toEqual(false)
    expect(component.state().error.letter).toEqual(true)
    expect(component.state().error.row).toEqual(true)
  })
})
