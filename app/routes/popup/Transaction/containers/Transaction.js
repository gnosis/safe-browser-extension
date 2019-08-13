import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import {
  getTransactionData,
  setUpTransaction,
  calculateGasEstimation,
  getTransactionSummary,
  isReplaceRecoveryPhrase
} from './transactions'
import { getEthBalance } from 'utils/helpers'
import Header from 'components/Headers/CompleteHeader'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'
import messages from '../../../../../extension/utils/messages'

class Transaction extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactionNumber: 0,
      transactionId: undefined,
      balance: undefined,
      loadedData: undefined,
      reviewedTx: false
    }

    const { location } = this.props
    this.password = location && location.state ? location.state.password : null
  }

  componentDidMount = () => {
    const { transactions, safes } = this.props
    const { transactionNumber } = this.state
    const { seed, unlockedMnemonic } = this.props.account.secondFA

    const tx = transactions.txs[transactionNumber].tx
    const txSafe = safes.safes.filter((safe) => safe.address === tx.from)[0]

    this.ethAccount =
      !unlockedMnemonic && this.password
        ? getDecryptedEthAccount(seed, this.password, txSafe.accountIndex || 0)
        : createAccountFromMnemonic(unlockedMnemonic, txSafe.accountIndex || 0)

    this.showTransaction(transactionNumber)
  }

  showTransaction = async (transactionNumber) => {
    const { transactions } = this.props
    if (!transactions || transactions.txs.length === 0) {
      return
    }

    const tx = transactions.txs[transactionNumber].tx
    if (!tx) return

    const replaceRecoveryPhrase = isReplaceRecoveryPhrase(tx.data)
    this.setState({
      transactionId: tx.id,
      reviewedTx: false,
      loadedData: undefined,
      transactionNumber,
      balance: undefined,
      symbol: undefined,
      displayedValue: undefined,
      decimals: undefined,
      estimations: undefined,
      transactionSummary: undefined,
      replaceRecoveryPhrase
    })

    try {
      const ethBalance = await getEthBalance(tx.from)
      const { balance, symbol, value, decimals } = await getTransactionData(
        tx.to,
        tx.from,
        tx.data,
        tx.value,
        ethBalance
      )
      const estimations = await calculateGasEstimation(tx, value)
      const transactionSummary = await getTransactionSummary(
        tx,
        estimations,
        value
      )

      let loadedData
      if (
        ethBalance instanceof BigNumber &&
        balance instanceof BigNumber &&
        estimations &&
        symbol
      ) {
        loadedData = true
      } else {
        loadedData = false
      }

      this.setState({
        balance,
        symbol,
        displayedValue: value,
        decimals,
        estimations,
        loadedData,
        transactionSummary
      })
    } catch (err) {
      this.setState({ loadedData: false })
      console.error(err)
    }
  }

  nextTransaction = () => {
    const { transactionNumber } = this.state
    const { transactions } = this.props

    if (transactionNumber < transactions.txs.length - 1) {
      this.showTransaction(transactionNumber + 1)
    }
  }

  previousTransaction = () => {
    const { transactionNumber } = this.state

    if (transactionNumber > 0) {
      this.showTransaction(transactionNumber - 1)
    }
  }

  handleTransaction = () => {
    const { account } = this.props
    if (account.lockedState) {
      return false
    }
    this.setState({ reviewedTx: true })
    return true
  }

  removeTransaction = async (position) => {
    const { transactions, onRemoveTransaction } = this.props

    const transactionsLength = transactions.txs.length - 1
    chrome.browserAction.setBadgeBackgroundColor({ color: '#888' })
    chrome.browserAction.setBadgeText({ text: transactionsLength.toString() })

    const transaction = transactions.txs[position]

    if (transaction.dappWindowId && transaction.dappTabId) {
      await chrome.tabs.query(
        { windowId: transaction.dappWindowId },
        (tabs) => {
          chrome.tabs.sendMessage(
            transaction.dappTabId,
            {
              msg: messages.MSG_RESOLVED_TRANSACTION,
              hash: null,
              id: transaction.tx.id
            },
            () => onRemoveTransaction(position)
          )
        }
      )
    } else {
      onRemoveTransaction(position)
    }
  }

  getSafeAlias = (address) => {
    const { safes } = this.props
    return safes.safes.filter((s) => s.address === address)[0].alias
  }

  render() {
    const {
      transactionNumber,
      balance,
      symbol,
      displayedValue,
      decimals,
      estimations,
      transactionSummary,
      loadedData,
      reviewedTx,
      replaceRecoveryPhrase
    } = this.state
    const { account, transactions, location } = this.props

    const transaction = transactions.txs[transactionNumber].tx
    setUpTransaction(transaction, estimations, displayedValue, decimals)

    return (
      <Layout
        transaction={transaction}
        transactions={transactions}
        balance={balance}
        symbol={symbol}
        transactionNumber={transactionNumber}
        lockedAccount={account.lockedState}
        loadedData={loadedData}
        reviewedTx={reviewedTx}
        transactionSummary={transactionSummary}
        replaceRecoveryPhrase={replaceRecoveryPhrase}
        safeAlias={this.getSafeAlias(transaction.safe)}
        ethAccount={this.ethAccount}
        previousTransaction={this.previousTransaction}
        nextTransaction={this.nextTransaction}
        removeTransaction={this.removeTransaction}
        showTransaction={this.showTransaction}
        handleTransaction={this.handleTransaction}
        location={location}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveTransaction: (position) =>
      dispatch(actions.removeTransaction(position))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(Transaction)
