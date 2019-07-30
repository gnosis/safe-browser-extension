import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ConfirmPasswordForm from './containers/ConfirmPasswordForm'

Enzyme.configure({ adapter: new Adapter() })

const manageConfirmPassword = jest.fn()

describe('Confirm Password Form Validation', () => {
  test('It should return true if the password matches', () => {
    const newPassword = 'qwertyu1'
    const confirmPassword = ''
    const props = {
      confirmPassword,
      manageConfirmPassword,
      passwordsMatch: false
    }

    const component = shallow(<ConfirmPasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: newPassword } })

    expect(manageConfirmPassword).toHaveBeenCalled()
  })

  test("It should return false if the password doesn't match", () => {
    const confirmPassword = 'asdfasdf'
    const props = {
      confirmPassword,
      manageConfirmPassword,
      passwordsMatch: false
    }

    const component = shallow(<ConfirmPasswordForm {...props} />)

    const inputPassword = component.dive().find('input')
    inputPassword.simulate('change', { target: { value: confirmPassword } })

    expect(manageConfirmPassword).toHaveBeenCalled()
  })
})
