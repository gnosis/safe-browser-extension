import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { TRANSACTIONS } from 'utils/analytics/events'
import selector from './selector'
import { getTxHash } from './gasData'
import { sendTransaction, getNonce } from 'utils/sendNotifications'
import Layout from '../components/Layout'
import messages from '../../../../../../../extension/utils/messages'

class SendTransaction extends Component {
  constructor (props) {
    super(props)
    this.maxSeconds = 30
    this.state = {
      seconds: this.maxSeconds
    }
  }

  handleConfirmTransaction = (resend) => {
    const {
      handleTransaction,
      transactionNumber
    } = this.props

    if (!handleTransaction()) {
      return
    }
    this.handleTransaction()

    chrome.runtime.sendMessage({
      msg: messages.MSG_PENDING_SENDTRANSACTION,
      position: transactionNumber
    })

    !(resend)
      ? ga(['_trackEvent', TRANSACTIONS, 'click-confirm-transaction-from-dapp', 'Confirm transaction from Dapp'])
      : ga(['_trackEvent', TRANSACTIONS, 'click-re-send-transaction-from-dapp', 'Re-send transaction from Dapp'])
  }

  handleRejectTransaction = () => {
    this.handleRemoveTransaction()
    ga(['_trackEvent', TRANSACTIONS, 'click-reject-transaction-from-dapp', 'Reject transaction from Dapp'])
  }

  handleMobileAppResponse = () => {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        if (request.msg === messages.MSG_RESOLVED_TRANSACTION) {
          clearInterval(this.timer)
          this.handleRemoveTransaction()
        }
      }
    )
  }

  handleTransaction = async () => {
    const {
      transaction,
      ethAccount
    } = this.props

    this.setState({ seconds: this.maxSeconds })
    this.startCountdown()
    try {
      transaction.nonce = await getNonce(transaction)
      transaction.hash = await getTxHash(transaction)

      const response = await sendTransaction(
        ethAccount.getChecksumAddressString(),
        ethAccount.getPrivateKey(),
        transaction,
        transaction.from
      )
      if (response && response.status === 204) {
        this.handleMobileAppResponse()
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

    const position = (transactionNumber >= 1) ? transactionNumber - 1 : 0
    await removeTransaction(transactionNumber)
    showTransaction(position)
  }

  retryShowTransaction = () => {
    const {
      transactionNumber,
      showTransaction
    } = this.props

    showTransaction(transactionNumber)
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
        retryShowTransaction={this.retryShowTransaction}
      />
    )
  }
}

export default connect(
  selector
)(SendTransaction)
