import React, { Component } from 'react'
import { connect } from 'react-redux'

import selector from './selector'
import { requestConfirmationResponse } from 'utils/sendNotifications'
import Layout from '../components/Layout'

class ConfirmTransaction extends Component {
  handleConfirmTransaction = () => {
    const { handleTransaction } = this.props

    if (handleTransaction()) { this.handleTransaction('confirmTransaction') }
  }

  handleRejectTransaction = () => {
    const { handleTransaction } = this.props

    if (handleTransaction()) { this.handleTransaction('rejectTransaction', 'GNO') }
  }

  handleTransaction = (type, prefix) => {
    const {
      transactionNumber,
      safes,
      transactions,
      ethAccount,
    } = this.props

    const hash = transactions.txs[transactionNumber].tx.hash
    requestConfirmationResponse(
      type,
      ethAccount.getChecksumAddressString(),
      ethAccount.getPrivateKey(),
      hash,
      safes.currentSafe,
      prefix
    )
      .then((response) => {
        if (response.status === 204) {
          this.handleRemoveTransaction()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  handleRemoveTransaction = () => {
    const {
      transactionNumber,
      showTransaction,
      transactions,
      removeTransaction
    } = this.props

    if (transactions.txs.length === 1) {
      removeTransaction(transactionNumber)
      window.close()
      return
    }

    const position = (transactionNumber >= 1) ? transactionNumber - 1 : 0
    removeTransaction(transactionNumber)
    showTransaction(position)
  }

  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedTx,
    } = this.props

    return (
      <Layout
        lockedAccount={lockedAccount}
        loadedData={loadedData}
        reviewedTx={reviewedTx}
        handleConfirmTransaction={this.handleConfirmTransaction}
        handleRejectTransaction={this.handleRejectTransaction}
      />
    )
  }
}

export default connect(
  selector
)(ConfirmTransaction)
