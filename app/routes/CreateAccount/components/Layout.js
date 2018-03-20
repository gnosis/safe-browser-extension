import React, { Component } from 'react'

class Layout extends Component {
  render() {
    const {
      password,
      confirmPassword,
      errorMessage,
      updatePassword,
      updateConfirmPassword,
      handleCreateAccount,
    } = this.props

    return (
      <Page>
        <input
          type='password'
          placeholder='New password'
          value={password}
          onChange={updatePassword} />

        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={updateConfirmPassword} />

        {errorMessage && <p>{errorMessage}</p>}

        <button onClick={handleCreateAccount}> Create account </button>
      </Page>
    )
  }
}

export default Layout
