import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { TRANSACTIONS } from 'utils/analytics/events'
import selector from './selector'
import { getTxHash } from './gasData'
import { sendTransaction } from 'utils/sendNotifications'
import { getNonce } from 'logic/contracts/safeContracts'
import Layout from '../components/Layout'
import messages from '../../../../../../../extension/utils/messages'

const SendTransaction = ({
  transactionNumber,
  showTransaction,
  transactions,
  removeTransaction,
  handleTransaction,
  transaction,
  ethAccount,
  lockedAccount,
  loadedData,
  reviewedTx
}) => {
  const maxSeconds = 30
  let timer = null
  const [seconds, setSeconds] = useState(maxSeconds)

  useEffect(() => {
    return () => clearInterval(timer)
  }, [])

  const handleConfirmTransaction = (resend) => {
    if (!handleTransaction()) {
      return
    }
    handleSendTransaction()

    chrome.runtime.sendMessage({
      msg: messages.MSG_PENDING_SENDTRANSACTION,
      position: transactionNumber
    })

    if (!resend) {
      ga([
        '_trackEvent',
        TRANSACTIONS,
        'click-confirm-transaction-from-dapp',
        'Confirm transaction from Dapp'
      ])
      return
    }
    ga([
      '_trackEvent',
      TRANSACTIONS,
      'click-re-send-transaction-from-dapp',
      'Re-send transaction from Dapp'
    ])
  }

  handleRejectTransaction = () => {
    handleRemoveSendTransaction()
    ga([
      '_trackEvent',
      TRANSACTIONS,
      'click-reject-transaction-from-dapp',
      'Reject transaction from Dapp'
    ])
  }

  handleMobileAppResponse = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.msg === messages.MSG_RESOLVED_TRANSACTION) {
        clearInterval(timer)
        handleRemoveSendTransaction()
      }
    })
  }

  const handleSendTransaction = async () => {
    setSeconds(maxSeconds)
    startCountdown()
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
        handleMobileAppResponse()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveSendTransaction = async () => {
    if (transactions.txs.length === 1) {
      await removeTransaction(transactionNumber)
      window.close()
      return
    }

    const position = transactionNumber >= 1 ? transactionNumber - 1 : 0
    await removeTransaction(transactionNumber)
    showTransaction(position)
  }

  const startCountdown = () => {
    timer = setInterval(this.countDown, 1000)
  }

  countDown = () => {
    if (seconds === 0) {
      clearInterval(timer)
      return
    }
    setSeconds((prevState) => prevState.seconds - 1)
  }

  return (
    <Layout
      lockedAccount={lockedAccount}
      loadedData={loadedData}
      reviewedTx={reviewedTx}
      seconds={seconds}
      handleConfirmTransaction={handleConfirmSendTransaction}
      handleRejectTransaction={handleRejectSendTransaction}
    />
  )
}

export default connect(selector)(SendTransaction)
