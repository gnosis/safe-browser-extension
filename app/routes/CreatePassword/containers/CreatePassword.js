import React, { Component } from 'react'

import Layout from '../components/Layout'

class CreatePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      error: {
        length: false,
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
      this.setState({
        continue: false,
        error: {
          ...this.state.error,
          length: false
        }
      })
      return false
    }
    else {
      this.setState({
        continue: true,
        error: {
          ...this.state.error,
          length: true
        }
      })
      return true
    }
  }

  validatePasswords = (password) => {
    const length = this.validateLenght(password)
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
