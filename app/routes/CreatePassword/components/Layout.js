import React, { Component } from 'react'

import Page from 'components/Page'

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
          onChange={updatePassword}
        />

        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={updateConfirmPassword}
        />

        {errorMessage && <p>{errorMessage}</p>}

        <button onClick={handleCreateAccount}>CREATE ACCOUNT</button>
      </Page>
    )
  }
}

export default Layout
