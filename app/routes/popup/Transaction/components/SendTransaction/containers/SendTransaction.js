import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { TRANSACTIONS } from 'utils/analytics/events'
import selector from './selector'
import { getTxHash } from './gasData'
import { sendTransaction, getNonce } from 'utils/sendNotifications'
import Layout from '../components/Layout'
import {
  MSG_PENDING_SENDTRANSACTION,
  MSG_RESOLVED_TRANSACTION
} from '../../../../../../../extension/utils/messages'

class SendTransaction extends Component {
  constructor (props) {
    super(props)
    this.maxSeconds = 30
    this.state = {
      seconds: this.maxSeconds
    }
  }

  handleConfirmTransaction = () => {
    const {
      handleTransaction,
      transactionNumber
    } = this.props

    if (!handleTransaction()) return
    this.handleTransaction()

    chrome.runtime.sendMessage({
      msg: MSG_PENDING_SENDTRANSACTION,
      position: transactionNumber
    })
    ga(['_trackEvent', TRANSACTIONS, 'click-confirm-transaction-from-dapp', 'Confirm transaction from Dapp'])
  }

  handleRejectTransaction = () => {
    this.handleRemoveTransaction()
    ga(['_trackEvent', TRANSACTIONS, 'click-reject-transaction-from-dapp', 'Reject transaction from Dapp'])
  }

  handleMobileAppResponse = () => {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        if (request.msg === MSG_RESOLVED_TRANSACTION) {
          clearInterval(this.timer)
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

    this.setState({ seconds: this.maxSeconds })
    this.startCountdown()
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

  startCountdown = () => {
    this.timer = setInterval(
      this.countDown,
      1000
    )
  }

  countDown = () => {
    const { seconds } = this.state
    if (seconds === 0) {
      clearInterval(this.timer)
      return
    }
    this.setState((prevState) => ({
      seconds: (prevState.seconds - 1)
    }))
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedTx
    } = this.props
    const { seconds } = this.state

    return (
      <Layout
        lockedAccount={lockedAccount}
        loadedData={loadedData}
        reviewedTx={reviewedTx}
        seconds={seconds}
        handleConfirmTransaction={this.handleConfirmTransaction}
        handleRejectTransaction={this.handleRejectTransaction}
      />
    )
  }
}

export default connect(
  selector
)(SendTransaction)
