import React, { Component } from 'react'
import { connect } from 'react-redux'

import selector from './selector'
import { getTxHash } from './gasData'
import { sendTransaction, getNonce } from 'utils/sendNotifications'
import Layout from '../components/Layout'
import {
  MSG_PENDING_SENDTRANSACTION,
  MSG_RESOLVED_TRANSACTION
} from '../../../../../../../extension/utils/messages'

class SendTransaction extends Component {
  handleConfirmTransaction = () => {
    const {
      handleTransaction,
      transactionNumber
    } = this.props

    if (handleTransaction()) {
      this.handleTransaction()

      chrome.runtime.sendMessage({
        msg: MSG_PENDING_SENDTRANSACTION,
        position: transactionNumber
      })
    }
  }

  handleRejectTransaction = () => {
    this.handleRemoveTransaction()
  }

  handleMobileAppResponse = () => {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        if (request.msg === MSG_RESOLVED_TRANSACTION) {
          this.handleRemoveTransaction()
        }
      }
    )
  }

  handleTransaction = async () => {
    const {
      transaction,
      safes,
      ethAccount
    } = this.props

    transaction.nonce = await getNonce(safes.currentSafe)
    transaction.hash = await getTxHash(transaction, safes.currentSafe)

    sendTransaction(
      ethAccount.getChecksumAddressString(),
      ethAccount.getPrivateKey(),
      transaction,
      safes.currentSafe
    )
      .then((response) => {
        if (response.status === 204) {
          this.handleMobileAppResponse()
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
      unlockRequest,
      loadedData,
      reviewedTx,
    } = this.props

    return (
      <Layout
        unlockRequest={unlockRequest}
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
)(SendTransaction)
