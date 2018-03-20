import React, { Component } from 'react'

import Page from 'components/Page'

class Layout extends Component {
  render() {
    const {
      transaction,
      password,
      errorMessage,
      updatePassword,
      handleConfirmTransaction,
    } = this.props

    const { from, to, gas, gasPrice, data } = transaction

    return (
      <Page withoutHeader>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>Gas: {gas}</p>
        <p>Gas price: {gasPrice} (GWei)</p>
        <p>Data: {data}</p>

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />

        {errorMessage && <p>{errorMessage}</p>}

        <button onClick={handleConfirmTransaction}>
          Confirm transaction
      </button>
      </Page>
    )
  }
}

export default Layout
