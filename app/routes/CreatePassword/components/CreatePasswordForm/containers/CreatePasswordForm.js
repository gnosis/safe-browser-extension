import React, { Component } from 'react'

import Layout from '../components/Layout'

class CreatePasswordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: {
        length: false,
        number: false,
        letter: false,
        row: false,
      }
    }
  }

  updateNewPassword = (e) => {
    this.validatePassword(e.target.value)
  }

  validateLength = (password) => {
    const validLength = password !== '' && password.length >= 8
    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        length: validLength
      }
    }))
    return validLength
  }

  validateNumber = (password) => {
    const expression = /.*\d+.*/
    const validExpression = password !== '' && expression.test(password)
    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        number: validExpression
      }
    }))
    return validExpression
  }

  validateLetter = (password) => {
    const expression = /.*[a-zA-Z]+.*/
    const validExpression = password !== '' && expression.test(password)
    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        letter: validExpression
      }
    }))
    return validExpression
  }

  validateRow = (password) => {
    const expression = /.*(.)\1{2}.*/
    const validExpression = password !== '' && !expression.test(password)
    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        row: validExpression
      }
    }))
    return validExpression
  }

  validatePassword = (password) => {
    const length = this.validateLength(password)
    const number = this.validateNumber(password)
    const letter = this.validateLetter(password)
    const row = this.validateRow(password)

    const result = (length && number && letter && row)
    this.props.manageCreatePassword(password, result)
  }

  render() {
    const { error } = this.state
    const { newPassword } = this.props

    return (
      <Layout
        newPassword={newPassword}
        error={error}
        updateNewPassword={this.updateNewPassword}
      />
    )
  }
}

export default CreatePasswordForm
