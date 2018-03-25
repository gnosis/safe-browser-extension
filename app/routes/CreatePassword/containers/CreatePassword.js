import React, { Component } from 'react'

import Layout from '../components/Layout'

class CreatePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      error: {
        length: false,
        number: false,
        letter: false,
        row: false,
      },
      continue: false,
    }

    this.properties = props.location.state
    console.log(this.properties)
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value })
    this.validatePasswords(e.target.value)
  }


  validateLenght = (password) => {
    if (!password || password.length < 8) {
      this.setState((prevState, props) => ({
        error: {
          ...prevState.error,
          length: false
        }
      }))
      return false
    }

    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        length: true
      }
    }))
    return true
  }

  validateNumber = (password) => {
    console.log(password)
    const expression = /.*\d+.*/
    if (!password || !expression.test(password)) {
      this.setState((prevState, props) => ({
        error: {
          ...prevState.error,
          number: false
        }
      }))
      return false
    }

    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        number: true
      }
    }))
    return true
  }

  validateLetter = (password) => {
    console.log(password)
    const expression = /.*[a-zA-Z]+.*/
    if (!password || !expression.test(password)) {
      this.setState((prevState, props) => ({
        error: {
          ...prevState.error,
          letter: false
        }
      }))
      return false
    }

    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        letter: true
      }
    }))
    return true
  }

  validateRow = (password) => {
    console.log(password)
    const expression = /.*(.)\1{2}.*/
    if (!password || expression.test(password)) {
      this.setState((prevState, props) => ({
        error: {
          ...prevState.error,
          row: false
        }
      }))
      return false
    }

    this.setState((prevState, props) => ({
      error: {
        ...prevState.error,
        row: true
      }
    }))
    return true
  }

  validatePasswords = (password) => {
    const length = this.validateLenght(password)
    const number = this.validateNumber(password)
    const letter = this.validateLetter(password)
    const row = this.validateRow(password)

    if (length && number && letter && row) {
      this.setState({ continue: true })
    }
    else {
      this.setState({ continue: false })
    }
  }

  render() {
    const {
      password,
      confirmPassword,
      error,
    } = this.state

    console.log(this.state)

    return (
      <Layout
        password={password}
        error={error}
        updatePassword={this.updatePassword}
        properties={this.properties}
        continue={this.state.continue}
      />
    )
  }
}

export default CreatePassword
