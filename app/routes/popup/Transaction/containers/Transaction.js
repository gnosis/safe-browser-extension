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
  getEthBalance,
  calculateGasEstimation
} from './transactions'
import Header from 'components/Header'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'
import { MSG_RESOLVED_TRANSACTION } from '../../../../../extension/utils/messages'
import styles from 'assets/css/global.css'

class Transaction extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transactionNumber: 0,
      balance: undefined,
      loadedData: false,
      reviewedTx: false
    }

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  componentDidMount = () => {
    const { seed, unlockedMnemonic } = this.props.account.secondFA
    const { transactionNumber } = this.state

    this.ethAccount = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)
    this.showTransaction(transactionNumber)
  }

  showTransaction = async (transactionNumber) => {
    const { transactions } = this.props
    if (!transactions || transactions.txs.length === 0) {
      return
    }

    const tx = transactions.txs[transactionNumber].tx
    if (!tx) return

    this.setState({
      reviewedTx: false,
      loadedData: false,
      transactionNumber,
      balance: undefined,
      symbol: undefined,
      value: undefined,
      estimations: undefined
    })

    try {
      const ethBalance = await getEthBalance(tx.from)
      const { balance, symbol, value, decimals } = await getTransactionData(tx.to, tx.from, tx.data, tx.value, ethBalance)
      const decimalValue = (decimals) ? value.div(10 ** decimals) : value

      const estimations = await calculateGasEstimation(tx, value)

      const loadedData = ethBalance instanceof BigNumber &&
        balance instanceof BigNumber &&
        estimations &&
        symbol

      this.setState({ balance, symbol, value: decimalValue, estimations, loadedData })
    } catch (err) {
      this.setState({ loadedData: false })
      console.error(err)
    }
  }

  nextTransaction = () => {
    const { transactionNumber } = this.state
    const { transactions } = this.props

    if (transactionNumber < (transactions.txs.length - 1)) {
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
    const { transactions } = this.props
    var removeTx = this.props.onRemoveTransaction

    const transactionsLength = transactions.txs.length - 1
    chrome.browserAction.setBadgeBackgroundColor({ color: '#888' })
    chrome.browserAction.setBadgeText({ text: transactionsLength.toString() })

    const transaction = transactions.txs[position]

    await chrome.tabs.query({ windowId: transaction.dappWindowId }, (tabs) => {
      chrome.tabs.sendMessage(transaction.dappTabId, {
        msg: MSG_RESOLVED_TRANSACTION,
        hash: null,
        id: transaction.tx.id
      }, () => removeTx(position))
    })
  }

  getSafeAlias = (address) => {
    const { safes } = this.props
    return safes.safes.filter(s => s.address === address)[0].alias
  }

  render () {
    const {
      transactionNumber,
      balance,
      symbol,
      value,
      estimations,
      loadedData,
      reviewedTx
    } = this.state
    const { account, transactions } = this.props

    const transaction = transactions.txs[transactionNumber].tx
    setUpTransaction(transaction, estimations)

    return (
      <div className={styles.extensionTx}>
        <div className={styles.extensionInner}>
          <Header
            noBorder
            txReview
            transactionNumber={transactionNumber}
            properties={this.props.location}
          />
          <div className={styles.Page}>
            <Layout
              transaction={transaction}
              transactions={transactions}
              balance={balance}
              symbol={symbol}
              value={value}
              transactionNumber={transactionNumber}
              lockedAccount={account.lockedState}
              loadedData={loadedData}
              reviewedTx={reviewedTx}
              estimations={estimations}
              safeAlias={this.getSafeAlias(transaction.safe)}
              ethAccount={this.ethAccount}
              previousTransaction={this.previousTransaction}
              nextTransaction={this.nextTransaction}
              removeTransaction={this.removeTransaction}
              showTransaction={this.showTransaction}
              handleTransaction={this.handleTransaction}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveTransaction: (position) => dispatch(actions.removeTransaction(position))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(Transaction)
