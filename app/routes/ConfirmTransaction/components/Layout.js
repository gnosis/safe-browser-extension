import React, { Component } from 'react'

import Page from 'components/Page'

class Layout extends Component {
  render() {
    const {
      transaction,
      handleConfirmTransaction,
    } = this.props

    const { hash, from, to, gas, gasPrice, data } = transaction

    return (
      <Page withoutHeader>
        <p>Hash: {hash}</p>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>Gas: {gas}</p>
        <p>Gas price: {gasPrice} (GWei)</p>
        <p>Data: {data}</p>

        <button onClick={handleConfirmTransaction}>
          Confirm
        </button>
      </Page>
    )
  }
}

export default Layout
