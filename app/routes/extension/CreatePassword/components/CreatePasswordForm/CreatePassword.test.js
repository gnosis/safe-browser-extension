/*
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CreatePasswordForm from './containers/CreatePasswordForm'

Enzyme.configure({ adapter: new Adapter() })

describe('Create Password Form Validation', () => {
  test('validateLength: It should return true if the password has minimum 8 characters', () => {
    const newPassword = 'qwertyui'
    const props = {
      newPassword
    }

    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateLength(newPassword)

    expect(component.state().errorLength).toEqual(true)
  })
  test('validateLength: It should return false if the password has less than 8 characters', () => {
    const newPassword = 'qwe'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateLength(newPassword)
    expect(component.state().errorLength).toEqual(false)
  })

  test('validateNumber: It should return true if the password has minimum 1 number', () => {
    const newPassword = 'qwe1'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateNumber(newPassword)
    expect(component.state().errorNumber).toEqual(true)
  })

  test('validateNumber: It should return false if the password has no numbers', () => {
    const newPassword = 'qwe'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateNumber(newPassword)
    expect(component.state().errorNumber).toEqual(false)
  })

  test('validateLetter: It should return true if the password has minimum 1 letter', () => {
    const newPassword = 'q'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateLetter(newPassword)
    expect(component.state().errorLetter).toEqual(true)
  })

  test('validateLetter: It should return false if the password has no letters', () => {
    const newPassword = '12345'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateLetter(newPassword)
    expect(component.state().errorLetter).toEqual(false)
  })

  test('validateRow: It should return true if the password has no more than 2 identical characters', () => {
    const newPassword = 'qwerrty123'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateRow(newPassword)
    expect(component.state().errorRow).toEqual(true)
  })

  test('validateRow: It should return false if the password has more more than 2 identical characters', () => {
    const newPassword = 'qwerrrty123'
    const props = {
      newPassword
    }
    const component = shallow(<CreatePasswordForm {...props} />)
    component.instance().validateRow(newPassword)
    expect(component.state().errorRow).toEqual(false)
  })

  test('validatePasswords: It should return true if the password meets all the requirements', () => {
    const newPassword = 'qwerty123'
    const props = {
      newPassword: '',
      manageCreatePassword
    }

    const component = shallow(<CreatePasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })

    expect(manageCreatePassword).toHaveBeenCalled()
    expect(component.state().errorLength).toEqual(true)
    expect(component.state().errorNumber).toEqual(true)
    expect(component.state().errorLetter).toEqual(true)
    expect(component.state().errorRow).toEqual(true)
  })

  test("validatePasswords: It should return false if the password doesn't meet all the requirements", () => {
    const newPassword = ''
    const props = {
      newPassword: '',
      manageCreatePassword
    }

    const component = shallow(<CreatePasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })

    expect(manageCreatePassword).toHaveBeenCalled()
    expect(component.state().errorLength).toEqual(false)
    expect(component.state().errorNumber).toEqual(false)
    expect(component.state().errorLetter).toEqual(false)
    expect(component.state().errorRow).toEqual(false)
  })

  test("validatePasswords: It should return false if the password doesn't meet all the requirements", () => {
    const newPassword = 'aa'
    const props = {
      newPassword: '',
      manageCreatePassword
    }

    const component = shallow(<CreatePasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })

    expect(manageCreatePassword).toHaveBeenCalled()
    expect(component.state().errorLength).toEqual(false)
    expect(component.state().errorNumber).toEqual(false)
    expect(component.state().errorLetter).toEqual(true)
    expect(component.state().errorRow).toEqual(true)
  })
})
*/
