import React from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { TRANSACTIONS } from 'utils/analytics/events'
import selector from './selector'
import { requestConfirmationResponse } from 'utils/sendNotifications'
import Layout from '../components/Layout'

const ConfirmTransaction = ({
  lockedAccount,
  loadedData,
  reviewedTx,
  handleTransaction,
  transaction,
  ethAccount,
  transactionNumber,
  showTransaction,
  transactions,
  removeTransaction
}) => {
  const handleConfirmTransaction = () => {
    if (!handleTransaction()) {
      return
    }
    handleTransactionConfirmation('confirmTransaction')

    ga([
      '_trackEvent',
      TRANSACTIONS,
      'click-confirm-transaction-from-mobile-app',
      'Confirm transaction from mobile app'
    ])
  }

  const handleRejectTransaction = () => {
    if (!handleTransaction()) {
      return
    }
    handleTransactionConfirmation('rejectTransaction', 'GNO')

    ga([
      '_trackEvent',
      TRANSACTIONS,
      'click-reject-transaction-from-mobile-app',
      'Reject transaction from mobile app'
    ])
  }

  const handleTransactionConfirmation = async (type, prefix) => {
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
        handleRemoveTransactionConfirmation()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveTransactionConfirmation = async () => {
    if (transactions.txs.length === 1) {
      await removeTransaction(transactionNumber)
      window.close()
      return
    }

    const position = transactionNumber >= 1 ? transactionNumber - 1 : 0
    await removeTransaction(transactionNumber)
    showTransaction(position)
  }

  return (
    <Layout
      lockedAccount={lockedAccount}
      loadedData={loadedData}
      reviewedTx={reviewedTx}
      handleConfirmTransaction={handleConfirmTransaction}
      handleRejectTransaction={handleRejectTransaction}
    />
  )
}

export default connect(selector)(ConfirmTransaction)
