import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { TRANSACTIONS } from 'utils/analytics/events'
import selector from './selector'
import { requestConfirmationResponse } from 'utils/sendNotifications'
import Layout from '../components/Layout'

class ConfirmTransaction extends Component {
  handleConfirmTransaction = () => {
    const { handleTransaction } = this.props

    if (!handleTransaction()) {
      return
    }
    this.handleTransaction('confirmTransaction')

    ga([
      '_trackEvent',
      TRANSACTIONS,
      'click-confirm-transaction-from-mobile-app',
      'Confirm transaction from mobile app'
    ])
  }

  handleRejectTransaction = () => {
    const { handleTransaction } = this.props

    if (!handleTransaction()) {
      return
    }
    this.handleTransaction('rejectTransaction', 'GNO')

    ga([
      '_trackEvent',
      TRANSACTIONS,
      'click-reject-transaction-from-mobile-app',
      'Reject transaction from mobile app'
    ])
  }

  handleTransaction = async (type, prefix) => {
    const { transaction, ethAccount } = this.props

    const hash = transaction.hash
    try {
      const response = await requestConfirmationResponse(
        type,
        ethAccount.getChecksumAddressString(),
        ethAccount.getPrivateKey(),
        hash,
        transaction.from,
        prefix
      )
      if (response && response.status === 204) {
        this.handleRemoveTransaction()
      }
    } catch (err) {
      console.error(err)
    }
  }

  handleRemoveTransaction = async () => {
    const {
      transactionNumber,
      showTransaction,
      transactions,
      removeTransaction
    } = this.props

    if (transactions.txs.length === 1) {
      await removeTransaction(transactionNumber)
      window.close()
      return
    }

    const position = transactionNumber >= 1 ? transactionNumber - 1 : 0
    await removeTransaction(transactionNumber)
    showTransaction(position)
  }

  render() {
    const { lockedAccount, loadedData, reviewedTx } = this.props

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

export default connect(selector)(ConfirmTransaction)
